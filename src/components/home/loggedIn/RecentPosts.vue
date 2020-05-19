<template>
	<div class="my-4">
		<div class="d-flex justify-content-end my-3">
			<button class="accent-button" @click="openPostCreateModal">Ask Question</button>
		</div>
		<div v-if="posts.length > 0">
			<p class="text-muted">Recent Posts</p>
			<post-card v-for="post in posts" :key="post['.key']" :post="post" />
			<div class="d-flex justify-content-end my-3">
				<button class="accent-button">
					<router-link class="text-decoration-none text-white" to="/posts">See More</router-link>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters, mapActions } from 'vuex'
	import PostCard from '@/components/posts/list/PostCard'
	export default {
		data: () => ({
			posts: [],
		}),
		async mounted(){
			let docs = await firestore.collection('posts').orderBy('dates.createdAt','desc').limit(5).get()
			docs.forEach(doc => this.posts.push({ '.key': doc.id, ...doc.data() }))
		},
		components: {
			'post-card': PostCard
		},
		computed: mapGetters(['questionsLeft','isSubscribed']),
		methods: {
			...mapActions(['setPostModalCreate']),
			openPostCreateModal(){
				if(this.questionsLeft){
					this.setPostModalCreate()
				}else{
					let title = ''
					if(this.isSubscribed){
						title = 'You have no questions left for the month. Consider purchasing extra questions from the shop'
					}else{
						title = 'You have no free questions left. Consider upgrading to a paid subscription to ask more'
					}
					new window.Toast({ icon: 'warning', title })
				}
			}
		}
	}
</script>