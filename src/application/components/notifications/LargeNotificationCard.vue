<template>
	<div class="mx-auto text-wrap p-0 alert" style="max-width:80ch;"
		:class="{'alert-light shadow-sm border-grey': notification.seen, 'blink alert-info': !notification.seen}">
		<a :href="notification.action" @click.prevent="proceedToRoute" class="d-block text-dark p-3">
			<h5><i class="mr-2" :class="icon"></i><span>{{ notification.title }}</span></h5>
			<p class="mb-0 small" v-html="notification.trimmedDescription"></p>
			<page-loading v-if="loading"></page-loading>
		</a>
		<div class="mx-3 mb-3 d-flex" v-if="notification.seen">
			<a @click.prevent="deleteNotification" class="ml-auto text-danger">
				Trash <i class="fas fa-trash ml-1"></i>
			</a>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.blink{ animation: blink 1s infinite; }
@keyframes blink {
	$color: #1eb2d4;
	from { color: $color; transform: scaleX(1); }
	50% {
		color: darken($color, 10%);
		box-shadow: rgba(0, 0, 0, 0.2) 0 4px 8px 4px, inset lighten($color, 50%) 0 -4px 8px, lighten($color, 40%) 0 4px 0;
		transform: scaleX(0.99);
	}
	to { color: $color; transform: scaleX(1); }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { NotificationEntity } from '@root/modules/notifications/domain/entities/notification'
import { useSingleNotification } from '@/usecases/notifications/notifications'
import router from '@/router'
export default defineComponent({
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		}
	},
	setup(props){
		const { loading, markSeen, markUnseen, deleteNotification } = useSingleNotification(props.notification.id)
		const icons = {
			info: 'text-info fas fa-info-circle',
			error: 'text-danger fas fa-exclamation-triangle',
			warning: 'text-warning fas fa-exclamation-triangle',
			success: 'text-success fas fa-check-circle'
		}
		return {
			icon: icons[props.notification.type],
			loading, markSeen, markUnseen, deleteNotification,
			proceedToRoute: () => {
				markSeen()
				router.push(props.notification.action)
			}
		}
	}
})
</script>
