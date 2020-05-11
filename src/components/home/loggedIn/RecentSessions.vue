<template>
	<div class="my-4">
		<p class="text-muted">Recent Sessions</p>
		<div v-if="sessions.length < 0">
			<session-card v-for="session in sessions" :key="session['.key']" :session="session" />
			<div class="d-flex justify-content-end my-3">
				<button class="accent-button shadow-none">
					<router-link class="text-decoration-none text-white" to="/sessions">See More</router-link>
				</button>
			</div>
		</div>
		<div v-else>
			<p class="small text-muted">
				<span>No sessions yet. </span>
				<router-link to="/tutors">Find a tutor now</router-link>
			</p>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { firestore } from '@/config/firebase'
	import SessionCard from '@/components/sessions/list/SessionCard'
	export default {
		data: () => ({
			sessions: [],
		}),
		computed: {
			...mapGetters(['getId','isTutor']),
		},
		async mounted(){
			let docs = await firestore.collection('sessions').orderBy('dates.createdAt','desc')
				.where(this.isTutor ? 'tutor' : 'student', '==', this.getId)
				.limit(5).get()
			docs.forEach(doc => this.sessions.push({ '.key': doc.id, ...doc.data() }))
		},
		components: {
			'session-card': SessionCard
		}
	}
</script>