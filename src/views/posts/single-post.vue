<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div id="content">
				<post-info :post="post" :user="user" />
				<div class="my-3">
					<p class="text-muted" v-if="replies.length === 0">No replies yet. Consider leaving one</p>
					<div v-else>
						<div class="text-center small text-muted my-2" v-if="hasMore">
							<i class="fas text-info fa-spinner fa-spin mr-1" v-if="isOlderRepliesLoading"></i>
							<span @click="fetchOlderReplies">Fetch Older Replies</span>
						</div>
						<div class="pl-4">
							<reply-card v-for="reply in replies" :key="reply['.key']" :reply="reply" :post="post"/>
						</div>
					</div>
				</div>
			</div>
			<reply-form />
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import PostInfo from '@/components/posts/single/PostInfo'
	import ReplyForm from '@/components/posts/single/ReplyForm'
	import ReplyCard from '@/components/posts/single/ReplyCard'
	export default {
		name: "Post",
		data: () => ({
			post: {},
			user: {},
			replies: [],
			listener: () => {},
			isLoading: true,
			isOlderRepliesLoading: false,
			paginationLimit: 24,
			hasMore: true
		}),
		methods: {
			async getPost(){
				let doc = await firestore.collection('posts').doc(this.$route.params.id).get()
				if(!doc.exists){ return this.$router.replace('/posts') }
				this.post = { '.key': doc.id, ...doc.data() }
			},
			async getOwner(){
				let doc = await firestore.collection('users').doc(this.post.userId).get()
				this.user = { '.key': doc.id, ...doc.data() }
			},
			async getReplies(){
				let docs = firestore.collection(`posts/${this.$route.params.id}/replies`)
					.orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
				if(this.replies.length > 0){
					let lastItem = this.replies[0]
					docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
				}
				docs = await docs.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach(doc => {
					let index = this.replies.findIndex(r => r['.key'] === doc.id)
					if(index === -1){
						this.replies.unshift({ '.key': doc.id, ...doc.data() })
					}else{
						this.replies[index] = { '.key': doc.id, ...doc.data() }
					}
				})
			},
			async setRepliesListeners(){
				let lastItem = this.replies[this.replies.length - 1]
				let query = firestore.collection(`posts/${this.$route.params.id}/replies`).orderBy('dates.createdAt')
				if(lastItem){
					query = query.where('dates.createdAt','>',lastItem.dates.createdAt)
				}
				this.listener = query.onSnapshot(snapshot => {
					snapshot.docs.forEach(doc => {
						let index = this.replies.findIndex(r => r['.key'] === doc.id)
						if(index === -1){
							this.replies.push({ '.key': doc.id, ...doc.data() })
						}else{
							this.replies[index] = { '.key': doc.id, ...doc.data() }
						}
					})
				})
			},
			async fetchOlderReplies(){
				this.isOlderRepliesLoading = true
				await this.getReplies()
				this.isOlderRepliesLoading = false
			}
		},
		async activated(){
			this.isLoading = true
			if(!this.post['.key']){
				await this.getPost()
				await this.getOwner()
				await this.getReplies()
			}
			await this.setRepliesListeners()
			this.isLoading = false
		},
		deactivated(){
			this.listener()
		},
		components: {
			'helper-spinner': HelperSpinner,
			'post-info': PostInfo,
			'reply-form': ReplyForm,
			'reply-card': ReplyCard,
		}
	}
</script>

<style lang="scss" scoped>
	#content{
		min-height: calc(100vh - 150px);
	}
</style>