<template>
	<div class="my-4" v-if="posts.length > 0">
		<p class="text-muted">Recent Posts</p>
		<post-card v-for="post in posts" :key="post['.key']" :post="post" />
		<div class="d-flex justify-content-end my-3">
			<button class="accent-button">
				<router-link class="text-decoration-none text-white" to="/posts">See More</router-link>
			</button>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import PostCard from '@/components/posts/list/PostCard'
	export default {
		data: () => ({
			posts: [],
		}),
		async mounted(){
			let docs = await firestore.collection('posts').orderBy('dates.createdAt','desc').limit(3).get()
			docs.forEach(doc => this.posts.push({ '.key': doc.id, ...doc.data() }))
		},
		components: {
			'post-card': PostCard
		}
	}
</script>