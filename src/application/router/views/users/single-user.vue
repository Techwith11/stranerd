<template>
	<Default>
		<div class="container py-3">
			<page-loading v-if="loading"/>
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
import UserInfo from '@application/components/users/single/UserInfo.vue'
import UserSessionCard from '@application/components/users/single/UserSessionCard.vue'
import { useUser } from '@application/usecases/users/users'
import router from '@application/router'
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
