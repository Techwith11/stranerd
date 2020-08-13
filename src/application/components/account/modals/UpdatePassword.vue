<template>
	<form class="m-md-5" @submit.prevent="updatePassword">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Update Password</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div class="form-group">
			<input type="password" id="password" class="form-control" placeholder="Password" v-model.trim="factory.password"
				:class="{'is-invalid': factory.errors.password, 'is-valid': factory.isValid('password')}" autocomplete="password">
			<span class="small" v-if="factory.errors.password">{{ factory.errors.password }}</span>
		</div>
		<div class="form-group">
			<input type="password" id="c_password" class="form-control" placeholder="Confirm Password" v-model.trim="factory.c_password"
				:class="{'is-invalid': factory.errors.c_password, 'is-valid': factory.isValid('c_password')}" autocomplete="password">
			<span class="small" v-if="factory.errors.c_password">{{ factory.errors.c_password }}</span>
		</div>
		<div class="d-flex justify-content-end">
			<button type="submit" :disabled="loading || !factory.valid" :class="loading || !factory.valid ? 'btn-secondary opacity-50' : 'btn-success'">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span>Update</span>
			</button>
		</div>
	</form>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import { useUpdatePasswordForm } from '@/usecases/users/auth'
	import store from '@root/application/store'
	export default defineComponent({
		setup(){
			const { loading, factory, updatePassword } = useUpdatePasswordForm()
			return {
				loading, factory, updatePassword,
				closeAccountModal: () => store.dispatch('closeAccountModal')
			}
		}
	})
</script>
