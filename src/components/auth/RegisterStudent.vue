<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i class="fas fa-arrow-left" @click="setModalOverview"></i>
			<h4>Sign up with Email</h4>
			<i></i>
		</div>
		<p class="small text-center my-4">Create an account to gain access to millions of ready made courses fit for everyone.</p>
		<form class="mx-2">
			<div class="form-group">
				<input type="text" id="name" class="form-control" placeholder="Full name" v-model.trim="$v.user.name.$model"
					:class="{'is-invalid': $v.user.name.$error, 'is-valid': !$v.user.name.$invalid}">
			</div>
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
				<button class="btn" @click.prevent="registerUser" :disabled="$v.$invalid || $v.$error">Sign Up</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { required, minLength, email, maxLength } from 'vuelidate/lib/validators'
	export default {
		name: 'RegisterStudent',
		data: () => ({
			user: {
				name: '',
				email: '',
				password: ''
			}
		}),
		methods:{
			...mapActions(['setModalOverview']),
			registerUser(){ alert('Registered')}
		},
		validations:{
			user: {
				name: { required, minLength: minLength(3) },
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