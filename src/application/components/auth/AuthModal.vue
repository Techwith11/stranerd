<template>
	<div class="modal-background">
		<div class="modal-inner">
			<login v-if="isAuthModalLogin" />
			<forgot-password v-if="isAuthModalForgotPassword" />
			<register-student v-if="isAuthModalRegisterStudent" />
		</div>
	</div>
</template>

<script>
import Login from '@/components/auth/Login'
import ForgotPassword from '@/components/auth/ForgotPassword'
import RegisterStudent from '@/components/auth/RegisterStudent'
import { useStore } from '@/usecases/store'
export default {
	components: {
		'login': Login,
		'forgot-password': ForgotPassword,
		'register-student': RegisterStudent,
	},
	setup(){
		return {
			isAuthModalLogin: useStore().modals.isAuthModalLogin,
			isAuthModalRegisterStudent: useStore().modals.isAuthModalRegisterStudent,
			isAuthModalForgotPassword: useStore().modals.isAuthModalForgotPassword,
		}
	}
}
</script>
