<template>
	<div class="p-3 white shadow-sm">
		<p class="text-muted">Top Tutors</p>
		<div v-if="tutors.length > 0">
			<tutor-card class="my-2" v-for="tutor in tutors" :user="tutor" :key="tutor['.key']" />
			<div class="d-flex justify-content-end my-3">
				<router-link class="text-decoration-none" to="/tutors">See More</router-link>
			</div>
		</div>
		<p class="lead" v-else>No tutors available at the moment.</p>
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
