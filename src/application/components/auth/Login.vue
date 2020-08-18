<template>
	<div class="m-md-4">
		<div class="d-flex align-items-center justify-content-between mb-2">
			<i></i>
			<h4 class="mb-0">Sign In</h4>
			<a @click.prevent="closeAuthModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<p class="small mb-4 text-center">Sign In to allow us serve you personalized content.</p>
		<form @submit.prevent="emailLogin">
			<div class="form-group">
				<input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="emailFactory.email"
					:class="{'is-invalid': emailFactory.errors.email, 'is-valid': emailFactory.isValid('email')}" autocomplete="email">
				<span class="small text-danger" v-if="emailFactory.errors.email">{{ emailFactory.errors.email }}</span>
			</div>
			<div class="form-group">
				<input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="emailFactory.password"
					:class="{'is-invalid': emailFactory.errors.password, 'is-valid': emailFactory.isValid('password')}" autocomplete="password">
				<span class="small text-danger" v-if="emailFactory.errors.password">{{ emailFactory.errors.password }}</span>
			</div>
			<div class="d-flex flex-column">
				<button class="btn btn-gold" id="loginBtn" type="submit" :disabled="anyLoading || !emailFactory.valid">
					<i class="fas fa-spinner fa-spin mr-2" v-if="emailLoading"></i>
					<span>Sign In with email</span>
				</button>
			</div>
			<div class="d-flex justify-content-between text-wrap align-items-center small">
				<span>
					Don't have an account?
					<a class="text-info" @click.prevent="setAuthModalRegisterStudent">Sign Up</a>
				</span>
				<span>
					Forgot Password?
					<a class="text-info" @click.prevent="setAuthModalForgotPassword">Retrieve Now</a>
				</span>
			</div>
		</form>
		<p class="text-center small text-muted mt-4 mb-0">Or sign in with other options</p>
		<div class="form-group d-flex flex-column my-3">
			<button @click="googleLogin" :disabled="anyLoading">
				<i class="fas fa-spinner fa-spin" v-if="googleLoading"></i>
				<i class="fab fa-google" v-else></i>
				Sign In with Google
			</button>
		</div>
		<div v-if="isDev" class="my-4">
			<div class="d-flex justify-content-center">
					<span class="mr-2" v-for="dev in devs" :key="dev">
						<input type="radio" v-model="devId" :value="dev" class="mr-1">
						<label class="text-capitalize">{{ dev }}</label>
					</span>
			</div>
			<button @click="devLogin" :disabled="!devId" class="w-100">
				<i class="fas fa-user-cog text-info"></i>
				Sign In as dev user
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useDevLogin, useGoogleLogin, useLoginForm } from '@/usecases/users/auth'
import store from '@/store'
export default defineComponent({
	name: 'Login',
	setup(){
		const { loading: emailLoading, login: emailLogin, factory: emailFactory } = useLoginForm()
		const { loading: googleLoading, login: googleLogin } = useGoogleLogin()
		const { loading: devLoading, login: devLogin, id: devId, devs, isDev } = useDevLogin()
		return {
			emailLoading, emailLogin, emailFactory,
			googleLoading, googleLogin,
			devLoading, devLogin, devId, devs, isDev,
			anyLoading: computed(() => emailLoading.value || devLoading.value || googleLoading.value),
			setAuthModalForgotPassword: () => store.dispatch('setAuthModalForgotPassword'),
			setAuthModalRegisterStudent: () => store.dispatch('setAuthModalRegisterStudent'),
			closeAuthModal: () => store.dispatch('closeAuthModal'),
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
	button{
		margin: 0.5rem 0;
		padding: 0.5rem 1.5rem;
		display: block;
		min-width: 256px;
		max-width: 700px;
		box-shadow: none;
	}
	#loginBtn{
		color: $white;
	}
	i.fa-google{
		color: #DD4B39;
		margin: 0 0.5rem 0 0;
	}
</style>
