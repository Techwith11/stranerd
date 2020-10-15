<template>
	<div class="modal-background">
		<div class="modal-inner">
			<login v-if="isAuthModalLogin" />
			<forgot-password v-if="isAuthModalForgotPassword" />
			<register v-if="isAuthModalRegister" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Login from '@application/components/auth/Login.vue'
import ForgotPassword from '@application/components/auth/ForgotPassword.vue'
import Register from '@application/components/auth/Register.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	components: {
		'login': Login,
		'forgot-password': ForgotPassword,
		'register': Register,
	},
	setup(){
		return {
			isAuthModalLogin: useStore().modals.isAuthModalLogin,
			isAuthModalRegister: useStore().modals.isAuthModalRegister,
			isAuthModalForgotPassword: useStore().modals.isAuthModalForgotPassword,
		}
	}
})
</script>
