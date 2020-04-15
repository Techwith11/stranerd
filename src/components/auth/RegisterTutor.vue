<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i class="fas fa-arrow-left" @click="setModalOverview"></i>
			<h4>Sign up as a Tutor</h4>
			<i></i>
		</div>
		<p class="small text-center my-4">Create an account to allow your account be visible to millions of students worldwide.</p>
		<form class="mx-2">
			<div class="form-group">
				<input type="text" id="name" class="form-control" placeholder="Full name" v-model.trim="$v.user.name.$model"
					:class="{'is-invalid': $v.user.name.$error, 'is-valid': !$v.user.name.$invalid}">
				<span class="small" v-if="$v.user.name.$error">Must be at least 3 characters</span>
			</div>
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
			<div class="form-group">
				<input type="password" id="c_password" class="form-control" placeholder="Confirm Password" v-model.trim="$v.user.c_password.$model"
					:class="{'is-invalid': $v.user.c_password.$error, 'is-valid': !$v.user.c_password.$invalid}">
				<span class="small" v-if="$v.user.c_password.$error">Passwords must match</span>
			</div>
			<div class="d-flex flex-column">
				<button @click.prevent="registerUser" :disabled="$v.$invalid || $v.$error">Sign Up</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { required, minLength, email, maxLength, sameAs } from 'vuelidate/lib/validators'
	export default {
		name: 'RegisterTutor',
		data: () => ({
			user: {
				name: '',
				email: '',
				password: '',
				c_password: '',
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
				password: { required, minLength: minLength(6), maxLength: maxLength(16) },
				c_password: { required, sameAs: sameAs('password') },
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
		background: $gradient-reversed;
		color: $white;
		border: 1px solid #333333;
		display: block;
		min-width: 256px;
		max-width: 700px;
	}
</style>