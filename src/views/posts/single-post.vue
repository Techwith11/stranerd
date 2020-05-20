<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div id="content">
				<post-info :post="post" :user="user" />
				<div class="my-3">
					<p class="text-muted" v-if="replies.length === 0">No replies yet. Consider leaving one</p>
					<div v-else>
						<div class="text-center small text-muted my-2" v-if="!hasNoMore">
							<i class="fas text-info fa-spinner fa-spin mr-1" v-if="isOlderRepliesLoading"></i>
							<span @click="fetchOlderReplies">Fetch Older Replies</span>
						</div>
						<ul class="">
							<reply-card v-for="reply in replies" :key="reply['.key']" :reply="reply"/>
							<reply-card v-for="reply in newReplies" :key="reply['.key']" :reply="reply"/>
						</ul>
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
			newReplies: [],
			listener: () => {},
			isLoading: true,
			isOlderRepliesLoading: false,
			paginationLimit: 20,
			hasNoMore: false
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
				if(docs.size < this.paginationLimit){ this.hasNoMore = true }
				docs.forEach(doc => this.replies.unshift({ '.key': doc.id, ...doc.data() }))
			},
			async setRepliesListeners(){
				let lastItem = this.replies[this.replies.length - 1]
				let query = firestore.collection(`posts/${this.$route.params.id}/replies`).orderBy('dates.createdAt')
				if(lastItem){
					query = query.where('dates.createdAt','>',lastItem.dates.createdAt)
				}
				this.listener = query.onSnapshot(snapshot => {
					this.newReplies = []
					snapshot.docs.forEach(doc => this.newReplies.push({ '.key': doc.id, ...doc.data() }))
				})
			},
			async fetchOlderReplies(){
				this.isOlderRepliesLoading = true
				await this.getReplies()
				this.isOlderRepliesLoading = false
			}
		},
		async mounted(){
			await this.getPost()
			await this.getOwner()
			await this.getReplies()
			await this.setRepliesListeners()
			this.isLoading = false
		},
		components: {
			'helper-spinner': HelperSpinner,
			'post-info': PostInfo,
			'reply-form': ReplyForm,
			'reply-card': ReplyCard,
		},
		beforeDestroy(){
			this.listener()
		}
	}
</script>

<style lang="scss" scoped>
	#content{
		min-height: calc(100vh - 150px);
	}
</style>