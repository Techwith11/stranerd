<template>
	<div class="d-flex justify-content-around my-2" v-if="isTutor">
		<router-link class="text-center py-2 text-decoration-none" to="/sessions"
			:id="isRouteMyTaughtSessions && isTutor ? 'not-active' : 'active'">
			My Sessions
		</router-link>
		<router-link class="text-center py-2 text-decoration-none" to="/sessions/taught" v-if="isTutor"
			:id="isRouteMyTaughtSessions ? 'active' : 'not-active'">
			Sessions Taught
		</router-link>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters(['isTutor']),
			isRouteMyTaughtSessions(){ return this.$route.path.includes('taught') }
		}
	}
</script>

<style lang="scss" scoped>
	a{
		width: 100%;
		min-width: 50%;
		border: none !important;
	}
	#not-active{
		background: $white;
		color: $text-black !important;
	}
	#active{
		background: $accent;
		color: $white !important;
	}
</style>
