<template>
	<Default>
		<helper-spinner v-if="isLoading"/>
		<div v-else class="container py-3">
			<helper-message message="No posts available at the moment. Check again later" v-if="posts.length === 0" />
			<div v-else>
				<div>
					<post-card :post="post" v-for="post in posts" :key="post['.key']" />
					<div class="d-flex justify-content-end my-3" v-if="hasMore">
						<button class="btn-success" @click="fetchOlderPosts">
							<i class="fas fa-spinner fa-spin mr-2" v-if="isOlderPostsLoading"></i>
							<span>Fetch More</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</Default>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import PostCard from '@/components/blog/list/PostCard'
	export default {
		name: 'Posts',
		data: () => ({
			isLoading: true,
			isOlderPostsLoading: false,
			fetched: false,
			listener: () => {},
			posts: [],
			paginationLimit: 24,
			hasMore: true
		}),
		components: {
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
			'post-card': PostCard
		},
		async mounted(){
			await this.getPosts()
			this.fetched = true
			this.isLoading = false
			window.Fire.$on('BlogPostEdited', post => {
				let index = this.posts.findIndex(p => p['.key'] === post['.key'])
				this.posts[index] = post
				this.$forceUpdate()
			})
			window.Fire.$on('BlogPostDeleted', post => this.posts = this.posts.filter(p => p['.key'] !== post['.key']))
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
					let docs = firestore.collection('blog').orderBy('dates.createdAt','desc')
						.limit(this.paginationLimit)
					let lastItem = this.posts[this.posts.length - 1]
					if(lastItem){
						docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
					}
					docs = await docs.get()
					this.hasMore = docs.size >= this.paginationLimit
					docs.forEach(doc => this.posts.push({ '.key': doc.id, ...doc.data() }))
				}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching posts. Try refreshing the page' }) }
			},
			async fetchOlderPosts(){
				this.isOlderPostsLoading = true
				await this.getPosts()
				this.isOlderPostsLoading = false
			},
			async setPostsListeners(){
				let lastItem = this.posts[this.posts.length - 1]
				let query = firestore.collection('blog').orderBy('dates.createdAt')
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
				title: 'Stranerd Blog',
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
