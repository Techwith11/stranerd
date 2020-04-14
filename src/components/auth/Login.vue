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
			</div>
			<div class="form-group">
				<input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="$v.user.password.$model"
					:class="{'is-invalid': $v.user.password.$error, 'is-valid': !$v.user.password.$invalid}">
				<small id="passwordHelpBlock" class="form-text small" aria-describedby="passwordHelpBlock"
					:class="$v.user.password.$error ? 'text-danger' : 'text-muted'">
					Your password must be 6-16 characters long.
				</small>
			</div>
			<div class="d-flex flex-column">
				<button class="btn" @click.prevent="loginUser" :disabled="$v.$invalid || $v.$error">Sign In</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
	export default {
		name: 'Login',
		data: () => ({
			user: {
				email: '',
				password: ''
			}
		}),
		methods:{
			...mapActions(['setModalOverview']),
			loginUser(){ alert('Logged In')}
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
	#body{
		width: 90%;
		max-width: 800px;
		margin: 2rem auto;
		padding: 20px;
		border-radius: 10px;
		background: $primary-light;
		box-shadow: 0 0 8px rgba(0,0,0,0.1);
		color: $text-black;
	}
	input{
		padding: 1rem;
		margin: 1rem 0;
		max-width: 700px;
	}
	button{
		margin: 0.5rem 0;
		padding: 0.5rem 1.5rem;
		background: $gradient-reversed;
		color: $white;
		border: 1px solid #333333;
		display: block;
		min-width: 256px;
		max-width: 700px;
	}
</style>