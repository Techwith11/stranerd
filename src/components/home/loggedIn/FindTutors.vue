<template>
	<div class="my-4" v-if="tutors.length > 0">
		<p class="text-muted">Top Tutors</p>
		<tutor-card class="my-2" v-for="tutor in tutors" :user="tutor" :key="tutor['.key']" />
		<div class="d-flex justify-content-end my-3">
			<button class="accent-button shadow-none">
				<router-link class="text-decoration-none text-white" to="/tutors">See More</router-link>
			</button>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import TutorCard from '@/components/home/loggedIn/TutorCard'
	export default {
		data: () => ({
			tutors: []
		}),
		async mounted() {
			let docs = await firestore.collection('users').where('roles.isTutor','==',true).orderBy('tutor.rating','desc').limit(5).get()
			docs.forEach(doc => this.tutors.push({ '.key': doc.id, ...doc.data() }))
		},
		components: {
			'tutor-card': TutorCard
		}
	}
</script>