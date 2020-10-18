<template>
	<Default>
		<banner>
			<div class="w-75 mx-auto">
				<h1>Keep Track of All Your Notifications</h1>
			</div>
		</banner>
		<page-loading v-if="loading" />
		<div class="container-fluid py-3" v-else>
			<helper-message :message=error v-if="error" />
			<div>
				<LargeNotificationCard v-for="notification in notifications" :key="notification.id" :notification="notification" />
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useNotifications } from '@/usecases/notifications/notifications'
import LargeNotificationCard from '@application/components/notifications/LargeNotificationCard.vue'
export default defineComponent({
	components: {
		LargeNotificationCard
	},
	setup(){
		const { loading, notifications, error } = useNotifications()
		return { loading, notifications, error }
	}
})
</script>
