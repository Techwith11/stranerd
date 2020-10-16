<template>
	<div class="nav-item dropdown">
		<a class="nav-link dropdown-toggle" id="notificationToggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<i class="fas fa-bell position-relative" style="font-size: 1.5rem;">
				<i class="position-absolute fas fa-circle blink" style="right:0;font-size: 0.75rem;"
					v-if="unreadNotifications.length"></i>
			</i>
		</a>
		<div class="dropdown-menu bg-white shadow py-2" aria-labelledby="notificationToggle" id="notificationMenu">
			<router-link class="dropdown-item nav-link py-2" to="/notifications">All Notifications</router-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.dropdown-toggle::after{ display: none; }
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
export default defineComponent({
	setup(){
		const { unreadNotifications } = useNotifications()
		return { unreadNotifications }
	}
})
</script>
