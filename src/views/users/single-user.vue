<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<div v-if="userExists">
				<user-info :user="user" />
				<div v-if="user.roles.isTutor">
					<h6 class="text-center font-weight-bold" v-if="sessions.length > 0">Recent Sessions</h6>
					<div class="row">
						<div class="col-md-6 col-lg-4" v-for="session in sessions" :key="session['.key']">
							<user-session-card  :session="session" />
						</div>
					</div>
				</div>
			</div>
			<helper-message v-else message="No user with such id exists"/>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import UserInfo from '@/components/users/single/UserInfo'
	import UserSessionCard from '@/components/users/single/UserSessionCard'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	export default {
		name: 'User',
		data: () => ({
			listener: null,
			sessions: [],
			isLoading: true,
			userExists: false,
			user: {}
		}),
		components: {
			'user-session-card': UserSessionCard,
			'user-info': UserInfo,
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
		},
		async mounted() {
			this.listener = firestore.collection('users').doc(this.$route.params.id).onSnapshot(snapshot => {
				this.userExists = snapshot.exists
				this.user = { '.key': snapshot.id, ...snapshot.data() }
				this.isLoading = false
			})
			let docs = await firestore.collection('sessions').where('tutor','==',this.$route.params.id)
				.orderBy('dates.createdAt','desc')
				.limit(12)
				.get()
			docs.forEach(doc => this.sessions.push({ '.key': doc.id, ...doc.data() }))
		},
		beforeDestroy(){
			this.listener()
		}
	}
</script>