<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div class="container" v-else>
			<helper-message message="No posts at the moment. Check again later" v-if="posts.length === 0" />
			<div v-else>
				<post-card v-for="post in posts" :key="post['.key']" :post="post" />
				<div class="text-center small text-muted mb-2" v-if="!hasNoMore">
					<i class="fas text-info fa-spinner fa-spin mr-1" v-if="isOlderPostsLoading"></i>
					<span @click="fetchOlderPosts">Fetch Older</span>
				</div>
			</div>
		</div>
	</div>
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
			paginationLimit: 50,
			hasNoMore: false
		}),
		components: {
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
			'post-card': PostCard,
		},
		async mounted(){
			await this.getPosts()
			this.isLoading = false
		},
		methods: {
			async getPosts(){
				let docs = firestore.collection('posts').orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
				if(this.posts.length > 0){
					let lastItem = this.posts[0]
					docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
				}
				docs = await docs.get()
				if(docs.size < this.paginationLimit){ this.hasNoMore = true }
				docs.forEach(doc => this.posts.unshift({ '.key': doc.id, ...doc.data() }))
			},
			async fetchOlderPosts(){
				this.isOlderPostsLoading = true
				await this.getPosts()
				this.isOlderPostsLoading = false
			}
		}
	}
</script>