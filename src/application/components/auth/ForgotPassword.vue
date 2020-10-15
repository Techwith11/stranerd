<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<a @click.prevent="setAuthModalLogin"><i class="fas fa-arrow-left"></i></a>
			<h4>Forgot Password</h4>
			<i></i>
		</div>
		<p class="small text-center my-4">Provide the email address associated with your previously created account.</p>
		<form class="mx-2" @submit.prevent="resetPassword">
			<div class="form-group">
				<input type="email" id="email" class="form-control" placeholder="Email address" v-model="factory.email"
					:class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email')}" autocomplete="email">
				<span class="small text-danger" v-if="factory.errors.email">{{ factory.errors.email }}</span>
			</div>
			<div class="d-flex flex-column">
				<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
					<i class="fas fa-spinner fa-spin" v-if="loading"></i>
					<span v-else>Retrieve Password</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useResetPasswordForm } from '@application/usecases/users/auth'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	name: 'ForgotPassword',
	setup(){
		const { loading, factory, resetPassword } = useResetPasswordForm()
		return {
			loading, factory, resetPassword,
			setAuthModalLogin: useStore().modals.setAuthModalLogin,
			closeAuthModal: useStore().modals.closeAuthModal
		}
	},
})
</script>

<style lang="scss" scoped>
	input{
		padding: 1rem;
		max-width: 700px;
	}
	button{
		margin: 0.5rem 0;
		padding: 0.5rem 1.5rem;
		color: $white;
		display: block;
		min-width: 256px;
		max-width: 700px;
		box-shadow: none;
	}
</style>
