<template>
	<div class="m-md-4">
		<div class="d-flex align-items-center justify-content-between mb-2">
			<i></i>
			<h4 class="mb-0">Sign Up</h4>
			<a @click.prevent="closeAuthModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<p class="small text-center mb-4">Create an account to gain access to millions of ready made courses fit for everyone.</p>
		<form class="mx-2" @submit.prevent="register">
			<div class="form-group">
				<input type="text" id="name" class="form-control" placeholder="Full name" v-model.trim="factory.name"
					:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}" autocomplete="name">
				<span class="small text-danger" v-if="factory.errors.name">{{ factory.errors.name }}</span>
			</div>
			<div class="form-group">
				<input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="factory.email"
					:class="{'is-invalid': factory.errors.email, 'is-valid': factory.isValid('email')}" autocomplete="email">
				<span class="small text-danger" v-if="factory.errors.email">{{ factory.errors.email }}</span>
			</div>
			<div class="form-group">
				<input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="factory.password"
					:class="{'is-invalid': factory.errors.password, 'is-valid': factory.isValid('password')}" autocomplete="password">
				<span class="small text-danger" v-if="factory.errors.password">{{ factory.errors.password }}</span>
			</div>
			<div class="form-group">
				<input type="password" id="c_password" class="form-control" placeholder="Confirm Password" v-model.trim="factory.c_password"
					:class="{'is-invalid': factory.errors.c_password, 'is-valid': factory.isValid('c_password')}" autocomplete="password">
				<span class="small text-danger" v-if="factory.errors.c_password">passwords don't match</span>
			</div>
			<div class="d-flex flex-column mt-2">
				<button type="submit" id="registerBtn" :disabled="anyLoading || !factory.valid"
					:class="anyLoading || !factory.valid ? 'opacity-25' : 'primary-button'">
					<i class="fas fa-spinner fa-spin mr-2" v-if="regLoading"></i>
					<span>Sign up</span>
				</button>
			</div>
		</form>
		<div class="small mt-2">
			<span>
				Already have an account?
				<a class="text-info" @click.prevent="setAuthModalLogin">Login</a>
			</span>
		</div>
		<p class="text-center small text-muted mt-4 mb-0">Or sign up with other options</p>
		<div class="form-group d-flex flex-column my-3">
			<button @click="googleLogin" :disabled="anyLoading">
				<i class="fas fa-spinner fa-spin" v-if="googleLoading"></i>
				<i class="fab fa-google" v-else></i>
				Sign Up with Google
			</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import { useGoogleLogin, useRegisterForm } from '@/usescases/users/auth'
	import store from '@/store'
	export default defineComponent({
		name: 'RegisterStudent',
		setup(){
			const { loading: googleLoading, login: googleLogin } = useGoogleLogin()
			const { loading: regLoading, register, factory: factory } = useRegisterForm()
			return {
				googleLoading, googleLogin,
				regLoading, register, factory,
				anyLoading: googleLoading || regLoading,
				setAuthModalLogin: () => store.dispatch('setAuthModalLogin'),
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
	#registerBtn{
		color: $white;
	}
	i.fa-google{
		color: #DD4B39;
		margin: 0 0.5rem 0 0;
	}
</style>
