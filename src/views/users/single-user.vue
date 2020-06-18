<template>
	<div class="container">
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<user-info :user="user" v-if="user['.key']" />
			<div v-if="user.roles && user.roles.isTutor" class="mt-5">
				<h6 class="text-center font-weight-bold" v-if="sessions.length > 0">Recent Sessions</h6>
				<div class="row">
					<div class="col-md-6 col-lg-4" v-for="session in sessions" :key="session['.key']">
						<user-session-card  :session="session" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import UserInfo from '@/components/users/single/UserInfo'
	import UserSessionCard from '@/components/users/single/UserSessionCard'
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		name: 'User',
		data: () => ({
			listener: () => {},
			sessions: [],
			isLoading: true,
			user: {}
		}),
		components: {
			'user-session-card': UserSessionCard,
			'user-info': UserInfo,
			'helper-spinner': HelperSpinner
		},
		async activated() {
			this.isLoading = true
			if(!this.user['.key']){
				let docs = await firestore.collection('sessions').where('tutor','==',this.$route.params.id)
					.where('cancelled.student','==',false)
					.where('cancelled.tutor','==',false)
					.orderBy('dates.createdAt','desc')
					.limit(12)
					.get()
				docs.forEach(doc => this.sessions.push({ '.key': doc.id, ...doc.data() }))
			}
			this.listener = firestore.collection('users').doc(this.$route.params.id).onSnapshot(snapshot => {
				if(!snapshot.exists){ return this.$router.replace('/tutors') }
				this.user = { '.key': snapshot.id, ...snapshot.data() }
			})
			this.isLoading = false
		},
		deactivated(){
			this.listener()
		},
		meta(){
			return {
				title: this.user.bio ? this.user.bio.name : 'Stranerd User',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: this.user.bio && this.user.bio.bio
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: [this.user.bio && this.user.bio.name].join(', ')
					}
				]
			}
		}
	}
</script>