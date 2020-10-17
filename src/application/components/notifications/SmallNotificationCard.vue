<template>
	<div>
		{{ notification }}
	</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { NotificationEntity } from '@root/modules/notifications/domain/entities/notification'
export default defineComponent({
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		}
	}
})
</script>
