<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<a @click.prevent="setAuthModalLogin"><i class="fas fa-arrow-left"></i></a>
			<h4>Forgot Password</h4>
			<i></i>
		</div>
		<p class="small text-center my-4">Provide the email address associated with your previously created account.</p>
		<form class="mx-2">
			<div class="form-group">
				<input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="$v.user.email.$model"
					:class="{'is-invalid': $v.user.email.$error, 'is-valid': !$v.user.email.$invalid}" autocomplete="email">
				<span class="small" v-if="$v.user.email.$error">Must be a valid email address</span>
			</div>
			<div class="d-flex flex-column">
				<button @click.prevent="retrievePassword" :disabled="$v.$invalid || $v.$error || isLoading" :class="$v.$invalid || $v.$error ? 'opacity-25' : 'primary-button'">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Retrieve Password</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { auth } from '@/config/firebase'
	import { required, email } from 'vuelidate/lib/validators'
	export default {
		name: 'ForgotPassword',
		data: () => ({
			user: {
				email: ''
			},
			isLoading: false
		}),
		methods:{
			...mapActions(['setAuthModalLogin','closeAuthModal']),
			retrievePassword(){
				this.isLoading = true
				auth.sendPasswordResetEmail(this.user.email)
					.then(async () => {
						this.isLoading = false
						new window.Toast({ icon: 'success', title: 'Proceed to email to continue' })
						this.closeAuthModal()
					})
					.catch(error => {
						new window.Toast({ icon: 'error', title: error.message })
						this.isLoading = false;
					})
			}
		},
		validations:{
			user: {
				email: { required, email }
			}
		}
	}
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
