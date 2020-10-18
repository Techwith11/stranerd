<template>
	<router-link class="small text-dark" :to="notification.action" :id="notification.id">
		<h6><i class="mr-1" :class="icon"></i> {{ notification.title }}</h6>
		<p class="mb-2">{{ notification.trimmedDescription }}</p>
		<small class="small">{{ notification.createdDate }}</small>
		<hr class="mb-2">
	</router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { NotificationEntity } from '@root/modules/notifications/domain/entities/notification'
export default defineComponent({
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		}
	},
	setup(props){
		const icons = {
			info: 'text-info fas fa-info-circle',
			error: 'text-danger fas fa-exclamation-triangle',
			warning: 'text-warning fas fa-exclamation-triangle',
			success: 'text-success fas fa-check-circle'
		}
		return {
			icon: computed(() => icons[props.notification.type])
		}
	}
})
</script>
