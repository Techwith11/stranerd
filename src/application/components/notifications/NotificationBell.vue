<template>
	<div class="nav-item dropdown">
		<a class="nav-link dropdown-toggle" id="notificationToggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<i class="fas fa-bell position-relative" style="font-size: 1.5rem;">
				<!--<i class="position-absolute fas fa-circle blink" style="right:0;font-size: 0.75rem;"
					v-if="unreadNotifications.length"></i>-->
				<span class="position-absolute text-white rounded p-1 bg-info" style="right:-0.2rem;top:-0.375rem;font-size: 0.75rem;"
					v-if="unreadNotifications.length">
					{{ unreadNotifications.length }}
				</span>
			</i>
		</a>
		<div class="dropdown-menu bg-white shadow py-2" aria-labelledby="notificationToggle" id="notificationMenu">
			<SmallNotificationCard class="py-2" v-for="notification in unreadNotifications.slice(0, 5)" :notification="notification" :key="notification.id" />
			<hr v-if="unreadNotifications.length">
			<router-link class="dropdown-item nav-link py-2" to="/notifications">See all notifications</router-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dropdown-toggle::before{ display: none !important; }
.dropdown-toggle::after{ display: none !important; }
.dropdown-menu{
	right: 0;
	left: unset;
}
@media (min-width: $lg){
	.dropdown-menu{ display: none; }
	.nav-item:hover .dropdown-menu{ display: block; }
}
.blink{ animation: blink 1s infinite; }
@keyframes blink {
	$color: #1eb2d4;
	from { color: $color; transform: scale(1); }
	50% {
		color: darken($color, 10%);
		transform: scale(0.85);
		box-shadow: inset lighten($color, 50%) 0 -1px 5px;
	}
	to { color: $color; transform: scale(1); }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useNotifications } from '@/usecases/notifications/notifications'
import SmallNotificationCard from '@application/components/notifications/SmallNotificationCard.vue'
export default defineComponent({
	components: {
		SmallNotificationCard
	},
	setup(){
		const { unreadNotifications } = useNotifications()
		return { unreadNotifications }
	}
})
</script>
