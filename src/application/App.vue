<template>
	<div>
		<router-view />
		<modals />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modals from '@/components/helpers/Modals'
export default {
	name: 'App',
	computed: mapGetters(['isLoggedIn','isTutor']),
	components: {
		'modals': Modals
	},
	methods: {
		...mapActions(['closeProfileListener', 'initializeTutorSessionsListener','closeTutorSessionsListener']),
		closeAllListeners(){
			this.closeTutorSessionsListener()
			this.closeProfileListener()
		}
	},
	async mounted(){
		this.isTutor ? this.initializeTutorSessionsListener() : null
		window.addEventListener('beforeunload', this.closeAllListeners)
	},
	beforeDestroy(){ this.closeAllListeners() },
	watch: {
		isTutor(){ return this.isTutor && this.initializeTutorSessionsListener() }
	}
}
</script>

<style lang="scss" scoped>
	#content{
		min-height: 95vh;
	}
</style>
