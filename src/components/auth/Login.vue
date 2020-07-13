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
				<button id="loginBtn" @click.prevent="loginUser" :disabled="$v.$invalid || $v.$error || isLoading" :class="$v.$invalid || $v.$error ? 'opacity-25' : 'primary-button'">
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
					<span class="mr-2">
						<input type="radio" v-model="devUser" value="kevin11" class="mr-1">
						<label>Kevin11</label>
					</span>
					<span class="mr-2">
						<input type="radio" v-model="devUser" value="frank" class="mr-1">
						<label>Frank</label>
					</span>
					<span class="mr-2">
						<input type="radio" v-model="devUser" value="max" class="mr-1">
						<label>Max</label>
					</span>
					<span class="mr-2">
						<input type="radio" v-model="devUser" value="joe" class="mr-1">
						<label>Joe</label>
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
	import { mapGetters, mapActions } from 'vuex'
	import firebase, { auth } from '@/config/firebase'
	import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
	export default {
		name: 'Login',
		data: () => ({
			user: {
				email: '',
				password: ''
			},
			devUser: null,
			isLoadingG: false,
			isLoading: false
		}),
		computed: {
			...mapGetters(['getIntendedRoute']),
			isDev(){ return process.env.NODE_ENV === 'development'}
		},
		methods:{
			...mapActions(['setId','setAuthModalForgotPassword', 'setAuthModalRegisterStudent', 'closeAuthModal','clearIntendedRoute']),
			loginWithGoogle(){
				this.isLoadingG = true
				let googleProvider = new firebase.auth.GoogleAuthProvider()
				auth.signInWithPopup(googleProvider).then(async () => {
					this.isLoadingG = false
					this.closeAuthModal()
					this.getIntendedRoute ? await this.$router.push(this.getIntendedRoute) : null
					this.clearIntendedRoute()
				}).catch(error => {
					this.isLoadingG = false
					new window.Toast({ icon: 'error', title: error.message })
				})
			},
			loginUser(){
				this.isLoading = true
				auth.signInWithEmailAndPassword(this.user.email, this.user.password)
					.then(async () => {
						this.isLoading = false
						this.closeAuthModal()
						this.getIntendedRoute ? await this.$router.push(this.getIntendedRoute) : null
						this.clearIntendedRoute()
					})
					.catch(error => {
						new window.Toast({ icon: 'error', title: error.message })
						this.isLoading = false;
					})
			},
			async loginAsDevUser(){
				this.setId(this.devUser)
				this.closeAuthModal()
				this.getIntendedRoute ? await this.$router.push(this.getIntendedRoute) : null
				this.clearIntendedRoute()
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
