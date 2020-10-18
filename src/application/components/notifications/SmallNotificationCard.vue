<template>
	<a class="small text-dark" :href="notification.action" @click.prevent="proceedToRoute" :to="notification.action" :id="notification.id">
		<h6><i class="mr-1" :class="icon"></i> {{ notification.title }}</h6>
		<p class="mb-2">{{ notification.trimmedDescription }}</p>
		<small class="small">{{ notification.createdDate }}</small>
		<hr class="mb-2">
	</a>
</template>

<style scoped>
.router-link-exact-active.nav-link { color: unset !important; }
</style>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { NotificationEntity } from '@root/modules/notifications/domain/entities/notification'
import router from '@/router'
import { useSingleNotification } from '@/usecases/notifications/notifications'
export default defineComponent({
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		}
	},
	setup(props){
		const { markSeen } = useSingleNotification(props.notification.id)
		const icons = {
			info: 'text-info fas fa-info-circle',
			error: 'text-danger fas fa-exclamation-triangle',
			warning: 'text-warning fas fa-exclamation-triangle',
			success: 'text-success fas fa-check-circle'
		}
		return {
			icon: computed(() => icons[props.notification.type]),
			proceedToRoute: () => {
				markSeen()
				router.push(props.notification.action)
			}
		}
	}
})
</script>
