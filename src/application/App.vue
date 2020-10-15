<template>
	<div id="content">
		<router-view />
		<modals />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modals from '@application/components/helpers/Modals'
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
		max-width: 1800px;
		margin: 0 auto;
	}
</style>
