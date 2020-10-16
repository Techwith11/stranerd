<template>
	<Default>
		<PageLoading v-if="loading" />
		<div class="container py-3" v-else>
			<h1>Notifications</h1>
			{{ notifications }}
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
