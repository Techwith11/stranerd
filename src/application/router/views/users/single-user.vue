<template>
	<Default>
		<div class="container py-3">
			<helper-spinner v-if="loading"/>
			<div v-else>
				<user-info :user="user" />
				<div v-if="user.roles.isTutor && user.tutor.canTeach" class="mt-5">
					<h6 class="text-center font-weight-bold" v-if="sessions.length > 0">Recent Sessions</h6>
					<div class="row">
						<div class="col-md-6 col-lg-4" v-for="session in sessions" :key="session['.key']">
							<user-session-card :session="session" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import UserInfo from '@/components/users/single/UserInfo.vue'
	import UserSessionCard from '@/components/users/single/UserSessionCard.vue'
	import { useUser } from '@/usecases/users/users'
	import router from '@/router'
	export default defineComponent({
		name: 'User',
		setup(){
			const { id } = router.currentRoute.params
			const { loading, user, sessions, error } = useUser(id)
			return { loading, user, sessions, error }
		},
		components: {
			'user-session-card': UserSessionCard,
			'user-info': UserInfo,
		},
		/*async activated() {
			this.isLoading = true
			try{
				this.listener = firestore.collection('users').doc(this.$route.params.id).onSnapshot(async snapshot => {
					if(!snapshot.exists){ return this.$router.replace('/tutors') }
					this.user = { '.key': snapshot.id, ...snapshot.data() }
					let isTutor = snapshot.data().roles.isTutor && snapshot.data().tutor.canTeach
					if(isTutor){
						let docs = await firestore.collection('sessions').where('tutor','==',this.$route.params.id)
							.where('cancelled.student','==',false)
							.where('cancelled.tutor','==',false)
							.orderBy('dates.createdAt','desc')
							.limit(12)
							.get()
						this.sessions = []
						docs.forEach(doc => this.sessions.push({ '.key': doc.id, ...doc.data() }))
					}
				})
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching user details. Try refreshing the page' }) }
			this.isLoading = false
		},*/
		meta(){
			return {
				title: (this.user as any)?.name ?? 'Stranerd User',
				meta: [
					{
						vmid: 'description',
						name: 'description',
						content: (this.user as any)?.bio
					},
					{
						vmid: 'keywords',
						name: 'keywords',
						content: [(this.user as any)?.name].join(', ')
					}
				]
			}
		}
	})
</script>
