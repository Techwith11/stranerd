<template>
	<div class="container">
		<div v-if="isLoading" class="my-5 py-5 d-flex justify-content-center">
			<i class="fas fa-2x fa-spinner fa-spin text-info"></i>
		</div>
		<div v-else>
			<user-info :user="user" />
			<h6 class="text-center font-weight-bold">Recent Sessions</h6>
			<div class="row">
				<div class="col-md-6 col-lg-4" v-for="session in sessions" :key="session['.key']">
					<user-session-card  :session="session" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import UserInfo from '@/components/users/single/UserInfo'
	import UserSessionCard from '@/components/users/single/UserSessionCard'
	export default {
		name: 'Tutor',
		data: () => ({
			listener: null,
			sessions: [],
			isLoading: true,
			user: {}
		}),
		components: {
			'user-session-card': UserSessionCard,
			'user-info': UserInfo,
		},
		mounted() {
			// TODO: Fetch sessions
			this.listener = firestore.collection('users').doc(this.$route.params.id).onSnapshot(snapshot => {
				this.user = { '.key': snapshot.id, ...snapshot.data() }
				this.isLoading = false
			})
		},
		beforeDestroy(){
			this.listener()
		}
	}
</script>