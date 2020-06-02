<template>
	<form class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Update Password</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
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
		<div class="d-flex justify-content-end">
			<button :disabled="isLoading || $v.$invalid" :class="isLoading || $v.$invalid ? 'btn-secondary opacity-25' : 'btn-success'" @click="update">
				<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
				<span>Update</span>
			</button>
		</div>
	</form>
</template>

<script>
	import { auth } from '@/config/firebase'
	import { mapActions, mapGetters } from 'vuex'
	import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			user: {
				password: '',
				c_password: '',
			},
			isLoading: false
		}),
		computed: {
			...mapGetters(['getUser'])
		},
		methods: {
			...mapActions(['closeAccountModal']),
			async update(){
				this.isLoading = true
				try{
					let user = auth.currentUser
					user ? await user.updatePassword(this.user.password) : null
					this.closeAccountModal()
					new window.Toast({ icon: 'success', title: 'Password updated successfully' })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		validations:{
			user: {
				password: { required, minLength: minLength(6), maxLength: maxLength(16) },
				c_password: { required, sameAs: sameAs('password') },
			}
		}
	}
</script>