<template>
	<form class="m-md-5" @submit.prevent="updatePassword">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Update Password</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div class="form-group">
			<input type="password" id="oldPassword" class="form-control" placeholder="Current Password" v-model="factory.oldPassword"
				:class="{'is-invalid': factory.errors.oldPassword, 'is-valid': factory.isValid('oldPassword')}" autocomplete="oldPassword">
			<span class="small" v-if="factory.errors.oldPassword">{{ factory.errors.oldPassword }}</span>
		</div>
		<div class="form-group">
			<input type="password" id="password" class="form-control" placeholder="New Password" v-model="factory.password"
				:class="{'is-invalid': factory.errors.password, 'is-valid': factory.isValid('password')}" autocomplete="password">
			<span class="small" v-if="factory.errors.password">{{ factory.errors.password }}</span>
		</div>
		<div class="form-group">
			<input type="password" id="c_password" class="form-control" placeholder="Confirm Password" v-model="factory.c_password"
				:class="{'is-invalid': factory.errors.c_password, 'is-valid': factory.isValid('c_password')}" autocomplete="password">
			<span class="small" v-if="factory.errors.c_password">{{ factory.errors.c_password }}</span>
		</div>
		<div class="d-flex justify-content-end">
			<button type="submit" class="btn btn-gold" :disabled="loading || !factory.valid">
				<loading class="mr-2" v-if="loading" />
				<span>Update password</span>
			</button>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useUpdatePasswordForm } from '@application/usecases/users/auth'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	setup(){
		const { loading, factory, updatePassword } = useUpdatePasswordForm()
		return {
			loading, factory, updatePassword,
			closeAccountModal: useStore().modals.closeAccountModal
		}
	}
})
</script>
