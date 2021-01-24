<template>
	<Auth>
		<div>
			<h2 class="text-center">Sign In</h2>
			<p class="small mb-4 text-center">Sign in to gain authorization access to restricted content.</p>
			<form @submit.prevent="emailLogin">
				<div class="form-group">
					<label for="email">Email Address</label>
					<input type="email" id="email" class="form-control" placeholder="Email address" v-model="emailFactory.email"
						:class="{'is-invalid': emailFactory.errors.email, 'is-valid': emailFactory.isValid('email')}" autocomplete="email">
					<span class="small text-danger" v-if="emailFactory.errors.email">{{ emailFactory.errors.email }}</span>
				</div>
				<div class="form-group">
					<label for="password" class="d-flex align-items-end">
						<span>Password</span>
						<a class="small text-muted ml-auto" @click.prevent="toggle">{{ show ? 'Hide' : 'Show' }} password</a>
					</label>
					<input :type="show ? 'text' : 'password'" id="password" class="form-control" placeholder="Password" v-model="emailFactory.password"
						:class="{'is-invalid': emailFactory.errors.password, 'is-valid': emailFactory.isValid('password')}" autocomplete="current-password">
					<span class="small text-danger" v-if="emailFactory.errors.password">{{ emailFactory.errors.password }}</span>
				</div>
				<div class="d-flex flex-column">
					<button class="btn btn-gold text-white" type="submit" :disabled="anyLoading || !emailFactory.valid">
						<loading class="mr-1" v-if="emailLoading" />
						<span>Sign In with email</span>
					</button>
				</div>
				<div class="d-flex justify-content-between text-wrap align-items-center small mt-2">
					<router-link class="text-info mr-3" to="/auth/signup">Sign up with new account</router-link>
					<router-link class="text-info" to="/auth/forgot">Retrieve forgotten password</router-link>
				</div>
			</form>
			<p class="text-center small text-muted mt-4 mb-2">Or sign in with other options</p>
			<div class="form-group d-flex flex-column mb-3">
				<button @click="googleLogin" class="btn btn-danger" :disabled="anyLoading">
					<loading class="mr-1" v-if="googleLoading"/>
					<i class="fab fa-google mr-2" v-else></i>
					Sign In with Google
				</button>
			</div>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useGoogleLogin, useLoginForm } from '@application/usecases/users/auth'
import { usePassword } from '@/usecases/core/forms'
export default defineComponent({
	name: 'Signin',
	setup(){
		const { show, toggle } = usePassword()
		const { loading: emailLoading, login: emailLogin, factory: emailFactory } = useLoginForm()
		const { loading: googleLoading, login: googleLogin } = useGoogleLogin()
		return {
			show, toggle,
			emailLoading, emailLogin, emailFactory,
			googleLoading, googleLogin,
			anyLoading: computed(() => emailLoading.value || googleLoading.value),
		}
	},
	meta(){
		return {
			title: 'Sign In',
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
