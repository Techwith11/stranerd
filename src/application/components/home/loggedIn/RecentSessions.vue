<template>
	<div class="p-3 white shadow">
		<p class="text-muted txt-shadow">Recent Sessions</p>
		<div v-if="sessions.length > 0">
			<session-card v-for="session in sessions" :key="session['.key']" :session="session" />
			<div class="d-flex justify-content-end my-3">
				<router-link class="text-decoration-none txt-shadow" to="/sessions">See More</router-link>
			</div>
		</div>
		<div v-else>
			<p class="small text-muted">
				<span>No sessions {{ isTutor ? 'taught' : 'attended' }} yet. </span>
				<router-link to="/tutors" v-if="!isTutor">Find a tutor now</router-link>
			</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { firestore } from '@application/config/firebase'
import SessionCard from '@application/components/sessions/list/SessionCard'
export default {
	data: () => ({
		sessions: [],
	}),
	computed: {
		...mapGetters(['getId','isTutor']),
	},
	async mounted(){
		try{
			const docs = await firestore.collection('sessions').orderBy('dates.createdAt','desc')
				.where(this.isTutor ? 'tutor' : 'student', '==', this.getId)
				.limit(3).get()
			docs.forEach((doc) => this.sessions.push({ '.key': doc.id, ...doc.data() }))
		}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching recent sessions. Try refreshing the page' }) }
	},
	components: {
		'session-card': SessionCard
	}
}
</script>
