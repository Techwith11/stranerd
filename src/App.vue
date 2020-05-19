<template>
	<div>
		<div id="content">
			<app-nav-bar />
			<router-view/>
		</div>
		<app-footer />
		<auth-modal v-if="isModalOpen"/>
		<session-modal v-if="isSessionModalOpen"/>
		<post-modal v-if="isPostModalOpen" />
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import Navbar from '@/components/app/Navbar'
	import Footer from '@/components/app/Footer'
	import AuthModal from '@/components/auth/AuthModal'
	import SessionModal from '@/components/sessions/modals/SessionModal'
	import PostModal from '@/components/posts/modals/PostModal'
	export default {
		name: 'App',
		components: {
			'app-nav-bar': Navbar,
			'app-footer': Footer,
			'auth-modal': AuthModal,
			'session-modal': SessionModal,
			'post-modal': PostModal
		},
		computed: mapGetters(['isModalOpen', 'getId', 'isTutor', 'isSessionModalOpen','isPostModalOpen']),
		methods: {
			...mapActions(['setProfileListener','closeProfileListener', 'initializeTutorSessionsListener','closeTutorSessionsListener','checkForUnfinishedTests']),
			closeAllListeners(){
				this.closeProfileListener()
				this.closeTutorSessionsListener()
			}
        },
		mounted(){
            this.getId ? this.setProfileListener() : null
            this.checkForUnfinishedTests()
            this.isTutor ? this.initializeTutorSessionsListener() : null
			window.addEventListener('beforeunload', this.closeAllListeners)
		},
		beforeDestroy(){ this.closeAllListeners() },
		watch: {
			getId(){
				if(this.getId){
					this.setProfileListener()
					this.checkForUnfinishedTests()
				}
			},
			isTutor(){ return this.isTutor ? this.initializeTutorSessionsListener() : null }
		}
	}
</script>

<style lang="scss" scoped>
	#content{
		min-height: 95vh;
	}
</style>
