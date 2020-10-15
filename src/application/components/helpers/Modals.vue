<template>
	<div>
		<auth-modal v-if="isAuthModalOpen"/>
		<create-modal v-if="isCreateModalOpen" />
		<edit-modal v-if="isEditModalOpen"/>
		<session-modal v-if="isSessionModalOpen"/>
		<post-modal v-if="isPostModalOpen" />
		<cart-modal v-if="isCartModalOpen" />
		<account-modal v-if="isAccountModalOpen" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AuthModal from '@application/components/auth/AuthModal.vue'
import CreateModal from '@application/components/admin/modals/CreateModal.vue'
import EditModal from '@application/components/admin/modals/EditModal.vue'
import SessionModal from '@application/components/sessions/modals/SessionModal.vue'
import PostModal from '@application/components/posts/modals/PostModal.vue'
import CartModal from '@application/components/shop/modals/CartModal.vue'
import AccountModal from '@application/components/account/modals/AccountModal.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	components: {
		'auth-modal': AuthModal,
		'create-modal': CreateModal,
		'edit-modal': EditModal,
		'session-modal': SessionModal,
		'post-modal': PostModal,
		'cart-modal': CartModal,
		'account-modal': AccountModal
	},
	setup(){
		return {
			isAuthModalOpen: useStore().modals.isAuthModalOpen,
			isCreateModalOpen: useStore().modals.isCreateModalOpen,
			isEditModalOpen: useStore().modals.isEditModalOpen,
			isSessionModalOpen: useStore().modals.isSessionModalOpen,
			isPostModalOpen: useStore().modals.isPostModalOpen,
			isCartModalOpen: useStore().modals.isCartModalOpen,
			isAccountModalOpen: useStore().modals.isAccountModalOpen,
		}
	}
})
</script>
