<template>
	<div class="p-3 shadow-sm white">
		<p class="text-muted">Recent Questions</p>
		<div v-if="posts.length > 0">
			<post-card v-for="post in posts" :key="post['.key']" :post="post" />
			<div class="d-flex justify-content-end mb-3">
				<router-link class="btn btn-primary text-decoration-none" to="/posts">See More</router-link>
			</div>
		</div>
		<p class="lead" v-else>No questions available at the moment. Try asking one <router-link to="/ask-a-question">here</router-link></p>
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
			try{
				let docs = await firestore.collection('posts').orderBy('dates.createdAt','desc').limit(3).get()
				docs.forEach(doc => this.posts.push({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching recent posts. Try refreshing the page' }) }
		},
		components: {
			'post-card': PostCard
		}
	}
</script>
