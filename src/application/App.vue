<template>
	<div>
		<router-view />
		<auth-modal v-if="isAuthModalOpen"/>
		<create-modal v-if="isCreateModalOpen" />
		<edit-modal v-if="isEditModalOpen"/>
		<session-modal v-if="isSessionModalOpen"/>
		<post-modal v-if="isPostModalOpen" />
		<cart-modal v-if="isCartModalOpen" />
		<account-modal v-if="isAccountModalOpen" />
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import AuthModal from '@/components/auth/AuthModal'
	import CreateModal from '@/components/admin/modals/CreateModal'
	import EditModal from '@/components/admin/modals/EditModal'
	import SessionModal from '@/components/sessions/modals/SessionModal'
	import PostModal from '@/components/posts/modals/PostModal'
	import CartModal from '@/components/shop/modals/CartModal'
	import AccountModal from '@/components/account/modals/AccountModal'
	export default {
		name: 'App',
		components: {
			'auth-modal': AuthModal,
			'create-modal': CreateModal,
			'edit-modal': EditModal,
			'session-modal': SessionModal,
			'post-modal': PostModal,
			'cart-modal': CartModal,
			'account-modal': AccountModal
		},
		computed: mapGetters(['isAuthModalOpen', 'isLoggedIn', 'isCreateModalOpen','isTutor', 'isEditModalOpen','isSessionModalOpen','isPostModalOpen','isCartModalOpen','isAccountModalOpen']),
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
			isTutor(){ return this.isTutor ? this.initializeTutorSessionsListener() : null }
		}
	}
</script>

<style lang="scss" scoped>
	#content{
		min-height: 95vh;
	}
</style>
