<template>
	<div class="my-4" v-if="tutors.length > 0">
		<p class="text-muted">Top Tutors</p>
		<tutor-card class="my-2" v-for="tutor in tutors" :user="tutor" :key="tutor['.key']" />
		<div class="d-flex justify-content-end my-3">
			<router-link class="btn btn-success text-decoration-none text-white px-4" to="/tutors">See More</router-link>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import TutorCard from '@/components/users/list/TutorCard'
	export default {
		data: () => ({
			tutors: []
		}),
		async mounted() {
			try{
				let docs = await firestore.collection('users')
					.where('roles.isTutor','==',true)
					.where('tutor.canTeach','==',true)
					.orderBy('tutor.rating','desc')
					.limit(3).get()
				docs.forEach(doc => this.tutors.push({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching top tutors. Try refreshing the page' }) }
		},
		components: {
			'tutor-card': TutorCard
		}
	}
</script>