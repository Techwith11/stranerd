<template>
	<Auth>
		<div>
			<h3 class="text-center">Forgot Password</h3>
			<p class="small text-center my-4">Provide the email address associated with your previously created account.</p>
			<form class="mx-2" @submit.prevent="resetPassword">
				<div class="form-group">
					<label for="email">Email Address</label>
					<input type="email" id="email" class="form-control" placeholder="Email address" v-model="factory.email"
						:class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email')}" autocomplete="email">
					<span class="small text-danger" v-if="factory.errors.email">{{ factory.errors.email }}</span>
				</div>
				<div class="d-flex flex-column">
					<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
						<loading class="mr-1" v-if="loading" />
						<span>Retrieve Password</span>
					</button>
				</div>
			</form>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useResetPasswordForm } from '@application/usecases/users/auth'
export default defineComponent({
	name: 'ForgotPassword',
	setup(){
		const { loading, factory, resetPassword } = useResetPasswordForm()
		return { loading, factory, resetPassword }
	},
	meta(){
		return {
			title: 'Forgot Password',
			meta: [
				{
					vmid: 'robots',
					name: 'robots',
					content: 'none'
				}
			]
		}
	}
})
</script>

<style lang="scss" scoped>
input{
	padding: 1rem;
	max-width: 700px;
}
.form-group{
	margin: 1rem 0;
}
</style>
