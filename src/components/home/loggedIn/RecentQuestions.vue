<template>
	<div class="my-4">
		<div class="d-flex justify-content-end my-3">
			<button class="accent-button" @click="openPostCreateModal">Ask Question</button>
		</div>
		<div v-if="questions.length < 0">
			<p class="text-muted">Recent Questions</p>
			<div class="card my-2" v-for="i in 3" :key="i">
				<div class="card-body">
					<h5 class="card-title">Question Topic</h5>
					<p class="card-text">Question body in full length. This is a non truncated view of the question</p>
					<h6 class="card-subtitle mb-2 text-muted">Some meta data for the question which will definitely include tags</h6>
					<a href="#" class="card-link">See Answers</a>
				</div>
			</div>
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
	export default {
		data: () => ({
			questions: [],
		}),
		async mounted(){
			let docs = await firestore.collection('questions').orderBy('dates.createdAt','desc').limit(5).get()
			docs.forEach(doc => this.questions.push({ '.key': doc.id, ...doc.data() }))
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