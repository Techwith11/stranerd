<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i class="fas fa-arrow-left" @click="setModalOverview"></i>
			<h4>Sign in with Email</h4>
			<i></i>
		</div>
		<p class="small text-center my-4">Provide the email address and password associated with your previously created account.</p>
		<form class="mx-2">
			<div class="form-group">
				<input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="$v.user.email.$model"
					:class="{'is-invalid': $v.user.email.$error, 'is-valid': !$v.user.email.$invalid}">
				<span class="small" v-if="$v.user.email.$error">Must be a valid email address</span>
			</div>
			<div class="form-group">
				<input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="$v.user.password.$model"
					:class="{'is-invalid': $v.user.password.$error, 'is-valid': !$v.user.password.$invalid}">
				<span class="small" v-if="$v.user.password.$error">Must be 6-16 characters long</span>
			</div>
			<div class="d-flex flex-column">
				<button @click.prevent="loginUser" :disabled="$v.$invalid || $v.$error || isLoading" :class="$v.$invalid || $v.$error ? 'opacity-25' : 'primary-button'">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Sign In </span>
				</button>
			</div>
			<span class="small my-3">
				Forgot Password?
				<a class="text-info" @click.prevent="setModalForgotPassword">Retrieve Now</a>
			</span>
		</form>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import { auth } from '@/config/firebase'
	import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
	export default {
		name: 'Login',
		data: () => ({
			user: {
				email: '',
				password: ''
			},
			isLoading: false
		}),
		computed: mapGetters(['getIntendedRoute']),
		methods:{
			...mapActions(['setModalOverview','setModalForgotPassword', 'closeModal','clearIntendedRoute']),
			loginUser(){
				this.isLoading = true
				auth.signInWithEmailAndPassword(this.user.email, this.user.password)
					.then(async () => {
						this.isLoading = false
						this.closeModal()
						this.getIntendedRoute ? await this.$router.push(this.getIntendedRoute) : null
						this.clearIntendedRoute()
					})
					.catch(error => {
						new window.Toast({ icon: 'error', title: error.message })
						this.isLoading = false;
					})
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
	@import '../../style/index';
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
		color: $white;
		display: block;
		min-width: 256px;
		max-width: 700px;
		box-shadow: none;
	}
</style>