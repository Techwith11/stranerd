<template>
	<div class="m-md-4">
		<div class="d-flex align-items-center justify-content-between mb-2">
			<i></i>
			<h4 class="mb-0">Sign Up</h4>
			<a @click.prevent="closeAuthModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<p class="small text-center mb-4">Create an account to gain access to millions of ready made courses fit for everyone.</p>
		<form class="mx-2">
			<div class="form-group">
				<input type="text" id="name" class="form-control" placeholder="Full name" v-model.trim="$v.user.name.$model"
					:class="{'is-invalid': $v.user.name.$error, 'is-valid': !$v.user.name.$invalid}" autocomplete="name">
				<span class="small" v-if="$v.user.name.$error">Must be at least 3 characters</span>
			</div>
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
			<div class="form-group">
				<input type="password" id="c_password" class="form-control" placeholder="Confirm Password" v-model.trim="$v.user.c_password.$model"
					:class="{'is-invalid': $v.user.c_password.$error, 'is-valid': !$v.user.c_password.$invalid}" autocomplete="password">
				<span class="small" v-if="$v.user.c_password.$error">Passwords must match</span>
			</div>
			<div class="d-flex flex-column mt-2">
				<button @click.prevent="registerUser" id="registerBtn" :disabled="$v.$invalid || $v.$error || isLoading" :class="$v.$invalid || $v.$error ? 'opacity-25' : 'primary-button'">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Submit</span>
				</button>
			</div>
			<div class="small mt-2">
				<span>
					Already have an account?
					<a class="text-info" @click.prevent="setAuthModalLogin">Login</a>
				</span>
			</div>
			<p class="text-center small text-muted mt-4 mb-0">Or sign up with other options</p>
			<div class="form-group d-flex flex-column my-3">
				<button @click="loginWithGoogle" :disabled="isLoadingG || isLoading">
					<i class="fas fa-spinner fa-spin" v-if="isLoadingG"></i>
					<i class="fab fa-google" v-else></i>
					Sign Up with Google
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import firebase, { auth, firestore } from '@/config/firebase.js'
	import { required, minLength, email, maxLength, sameAs } from 'vuelidate/lib/validators'
	export default {
		name: 'RegisterStudent',
		data: () => ({
			user: {
				name: '',
				email: '',
				password: '',
				c_password: '',
			},
			isLoadingG: false,
			isLoading: false
		}),
		computed: mapGetters(['getIntendedRoute']),
		methods:{
			...mapActions(['setAuthModalLogin','closeAuthModal','clearIntendedRoute']),
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
			registerUser(){
				this.isLoading = true
				auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
					.then(async result => {
						await firestore.collection('users').doc(result.user.uid).set({ bio: { name: this.user.name }},{ merge: true })
						this.closeAuthModal()
						this.getIntendedRoute ? await this.$router.push(this.getIntendedRoute) : null
						this.clearIntendedRoute()
						this.isLoading = false
					})
					.catch(error => {
						new window.Toast({ icon: 'error', title: error.message })
						this.isLoading = false;
					})
			}
		},
		validations:{
			user: {
				name: { required, minLength: minLength(3) },
				email: { required, email },
				password: { required, minLength: minLength(6), maxLength: maxLength(16) },
				c_password: { required, sameAs: sameAs('password') },
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
	#registerBtn{
		color: $white;
	}
	i.fa-google{
		color: #DD4B39;
		margin: 0 0.5rem 0 0;
	}
</style>
