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
	import { mapGetters } from 'vuex'
	import Login from '@/components/auth/Login'
	import ForgotPassword from '@/components/auth/ForgotPassword'
	import RegisterStudent from '@/components/auth/RegisterStudent'
	export default {
		components: {
			'login': Login,
			'forgot-password': ForgotPassword,
			'register-student': RegisterStudent,
		},
		computed: {
			...mapGetters(['isAuthModalLogin','isAuthModalRegisterStudent','isAuthModalForgotPassword'])
		}
	}
</script>
