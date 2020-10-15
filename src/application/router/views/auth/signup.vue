<template>
	<Auth>
		<div>
			<h2 class="text-center">Sign Up</h2>
			<p class="small mb-4 text-center">Create an account to gain authorization access to restricted content.</p>
			<form @submit.prevent="register">
				<div class="form-group">
					<input type="text" id="name" class="form-control" placeholder="Name" v-model="factory.name"
						:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}" autocomplete="name">
					<span class="small text-danger" v-if="factory.errors.name">{{ factory.errors.name }}</span>
				</div>
				<div class="form-group">
					<input type="email" id="email" class="form-control" placeholder="Email address" v-model="factory.email"
						:class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email')}" autocomplete="email">
					<span class="small text-danger" v-if="factory.errors.email">{{ factory.errors.email }}</span>
				</div>
				<div class="form-group">
					<input type="password" id="password" class="form-control" placeholder="Password" v-model="factory.password"
						:class="{'is-invalid': factory.errors.password, 'is-valid': factory.isValid('password')}" autocomplete="password">
					<span class="small text-danger" v-if="factory.errors.password">{{ factory.errors.password }}</span>
				</div>
				<div class="form-group">
					<input type="password" id="c_password" class="form-control" placeholder="Confirm Password" v-model="factory.c_password"
						:class="{'is-invalid': factory.errors.c_password, 'is-valid': factory.isValid('c_password')}" autocomplete="password">
					<span class="small text-danger" v-if="factory.errors.c_password">passwords don't match</span>
				</div>
				<div class="d-flex flex-column">
					<button class="btn btn-gold text-white" type="submit" :disabled="anyLoading || !factory.valid">
						<loading class="mr-2" v-if="regLoading" />
						<span>Sign up with email</span>
					</button>
				</div>
				<div class="small mt-2">
					<span>
						Already have an account?
						<router-link class="text-info" to="/auth/signin">Sign in</router-link>
					</span>
				</div>
			</form>
			<p class="text-center small text-muted mt-4 mb-2">Or sign up with other options</p>
			<div class="form-group d-flex flex-column mb-3">
				<button @click="googleLogin" class="btn btn-danger" :disabled="anyLoading">
					<loading class="mr-1" v-if="googleLoading"/>
					<i class="fab fa-google mr-2" v-else></i>
					Sign Up with Google
				</button>
			</div>
		</div>
	</Auth>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useGoogleLogin, useRegisterForm } from '@application/usecases/users/auth'
export default defineComponent({
	name: 'Signup',
	setup(){
		const { loading: googleLoading, login: googleLogin } = useGoogleLogin()
		const { loading: regLoading, register, factory: factory } = useRegisterForm()
		return {
			googleLoading, googleLogin,
			regLoading, register, factory,
			anyLoading: computed(() => googleLoading.value || regLoading.value),
		}
	},
	meta(){
		return {
			title: 'Sign Up',
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
