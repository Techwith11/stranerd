<template>
	<Default>
		<helper-spinner v-if="isLoading"/>
		<div class="container" v-else>
			<helper-message message="No posts at the moment. Check again later" v-if="posts.length === 0" />
			<div v-else>
				<post-card v-for="post in posts" :key="post['.key']" :post="post" />
				<div class="text-center small text-muted mb-2" v-if="hasMore">
					<i class="fas text-info fa-spinner fa-spin mr-1" v-if="isOlderPostsLoading"></i>
					<span @click="fetchOlderPosts">Fetch Older</span>
				</div>
			</div>
		</div>
	</Default>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import PostCard from '@/components/posts/list/PostCard'
	export default {
		name: 'Posts',
		data: () => ({
			posts: [],
			isLoading: true,
			isOlderPostsLoading: false,
			fetched: false,
			listener: () => {},
			paginationLimit: 24,
			hasMore: true
		}),
		components: {
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
			'post-card': PostCard,
		},
		async mounted(){
			await this.getPosts()
			this.fetched = true
			this.isLoading = false
		},
		async activated(){
			if(this.fetched){
				await this.setPostsListeners()
			}
		},
		deactivated(){
			this.listener()
		},
		methods: {
			async getPosts(){
				try{
					let docs = firestore.collection('posts').orderBy('dates.createdAt','desc')
						.limit(this.paginationLimit)
					if(this.posts.length > 0){
						let lastItem = this.posts[0]
						docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
					}
					docs = await docs.get()
					this.hasMore = docs.size >= this.paginationLimit
					docs.forEach(doc => this.posts.unshift({ '.key': doc.id, ...doc.data() }))
				}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching posts. Try refreshing the page' }) }
			},
			async fetchOlderPosts(){
				this.isOlderPostsLoading = true
				await this.getPosts()
				this.isOlderPostsLoading = false
			},
			async setPostsListeners(){
				let lastItem = this.posts[this.posts.length - 1]
				let query = firestore.collection('posts').orderBy('dates.createdAt')
				if(lastItem){
					query = query.where('dates.createdAt','>',lastItem.dates.createdAt)
				}
				this.listener = query.onSnapshot(snapshot => {
					snapshot.docs.forEach(doc => {
						let index = this.posts.findIndex(r => r['.key'] === doc.id)
						if(index === -1){
							this.posts.unshift({ '.key': doc.id, ...doc.data() })
						}else{
							this.posts[index] = { '.key': doc.id, ...doc.data() }
						}
					})
				})
			}
		},
		meta(){
			return {
				title: 'Recent Questions',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: ''
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: [].join(', ')
					}
				]
			}
		}
	}
</script>
