<template>
	<div class="m-md-4">
		<div class="d-flex align-items-center justify-content-between mb-2">
			<i></i>
			<h4 class="mb-0">Sign In</h4>
			<a @click.prevent="closeAuthModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<p class="small mb-4 text-center">Sign In to allow us serve you personalized content.</p>
		<form @submit.prevent>
			<div class="form-group">
				<input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="$v.user.email.$model"
					:class="{'is-invalid': $v.user.email.$error, 'is-valid': !$v.user.email.$invalid}" autocomplete="email">
				<span class="small" v-if="$v.user.email.$error">Must be a valid email address</span>
			</div>
			<div class="form-group">
				<input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="$v.user.password.$model"
					:class="{'is-invalid': $v.user.password.$error, 'is-valid': !$v.user.password.$invalid}" autocomplete="password">
				<span class="small" v-if="$v.user.password.$error">Must be 6-16 characters long</span>
			</div>
			<div class="d-flex flex-column">
				<button id="loginBtn" @click.prevent="loginWithEmail" :disabled="$v.$invalid || $v.$error || isLoading" :class="$v.$invalid || $v.$error ? 'opacity-25' : 'primary-button'">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Sign In with email</span>
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
			<p class="text-center small text-muted mt-4 mb-0">Or sign in with other options</p>
			<div class="form-group d-flex flex-column my-3">
				<button @click="loginWithGoogle" :disabled="isLoadingG || isLoading">
					<i class="fas fa-spinner fa-spin" v-if="isLoadingG"></i>
					<i class="fab fa-google" v-else></i>
					Sign In with Google
				</button>
			</div>
			<div v-if="isDev" class="my-4">
				<div class="d-flex justify-content-center">
					<span class="mr-2" v-for="dev in devs" :key="dev">
						<input type="radio" v-model="devUser" :value="dev" class="mr-1">
						<label class="text-capitalize">{{ dev }}</label>
					</span>
				</div>
				<button @click="loginAsDevUser" :disabled="!devUser" class="w-100">
					<i class="fas fa-user-cog text-info"></i>
					Sign In as dev user
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
	import { loginWithEmail, loginWithGoogle, loginAsDevUser } from '@/config/auth'
	export default {
		name: 'Login',
		data: () => ({
			user: {
				email: '',
				password: ''
			},
			devs: ['kevin11','frank','joe','max'],
			devUser: null,
			isLoadingG: false,
			isLoading: false
		}),
		computed: {
			isDev(){ return process.env.NODE_ENV === 'development'}
		},
		methods:{
			...mapActions(['setAuthModalForgotPassword', 'setAuthModalRegisterStudent','closeAuthModal']),
			async loginWithGoogle(){
				this.isLoadingG = true
				await loginWithGoogle()
				this.isLoadingG = false
			},
			async loginWithEmail(){
				this.isLoading = true
				await loginWithEmail(this.user)
				this.isLoading = false
			},
			async loginAsDevUser(){
				await loginAsDevUser(this.devUser)
			}
		},
		validations:{
			user: {
				email: { required, email },
				password: { required, minLength: minLength(6), maxLength: maxLength(16) }
			}
		}
	}
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
		border: 1px solid #333333;
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
