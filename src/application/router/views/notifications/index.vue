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
				<div v-for="notification in notifications" :key="notification.id" class="shadow-sm p-3" >
					{{ notification }}
				</div>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useNotifications } from '@/usecases/notifications/notifications'
export default defineComponent({
	setup(){
		const { loading, notifications, error } = useNotifications()
		return { loading, notifications, error }
	}
})
</script>
