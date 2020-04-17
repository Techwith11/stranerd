<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i class="fas fa-arrow-left" @click="setModalLogin"></i>
			<h4>Forgot Password</h4>
			<i></i>
		</div>
		<p class="small text-center my-4">Provide the email address associated with your previously created account.</p>
		<form class="mx-2">
			<div class="form-group">
				<input type="email" id="email" class="form-control" placeholder="Email address" v-model.trim="$v.user.email.$model"
					:class="{'is-invalid': $v.user.email.$error, 'is-valid': !$v.user.email.$invalid}">
				<span class="small" v-if="$v.user.email.$error">Must be a valid email address</span>
			</div>
			<div class="d-flex flex-column">
				<button @click.prevent="retrievePassword" :disabled="$v.$invalid || $v.$error" :class="$v.$invalid || $v.$error ? 'opacity-25' : 'primary-button'">Retrieve Password</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { required, email } from 'vuelidate/lib/validators'
	export default {
		name: 'ForgotPassword',
		data: () => ({
			user: {
				email: ''
			}
		}),
		methods:{
			...mapActions(['setModalLogin']),
			retrievePassword(){ alert('Retrieved')}
		},
		validations:{
			user: {
				email: { required, email }
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