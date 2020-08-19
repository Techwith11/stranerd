<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Profile Settings</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div class="d-flex flex-column">
			<button class="btn btn-warning text-white" @click="setAccountModalEditProfile">Edit Profile</button>
			<button class="btn btn-warning text-white" @click="setAccountModalUpdatePassword">Update Password</button>
			<button class="btn btn-success" @click="setAccountModalSelectSubscription">{{ isSubscribed ? 'Change subscription' : 'Subscribe now' }}</button>
			<button class="btn btn-danger" @click="cancelSubscription" v-if="isSubscribed" :disabled="loading">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span>Cancel subscription</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCancelSubscription } from '@/usecases/payments/subscription'
import { useStore } from '@/usecases/store'
export default defineComponent({
	setup(){
		const { loading, cancelSubscription } = useCancelSubscription()
		return {
			loading, cancelSubscription,
			isSubscribed: useStore().auth.isSubscribed,
			closeAccountModal: useStore().modals.closeAccountModal,
			setAccountModalEditProfile: useStore().modals.setAccountModalEditProfile,
			setAccountModalUpdatePassword: useStore().modals.setAccountModalUpdatePassword,
			setAccountModalSelectSubscription: useStore().modals.setAccountModalSelectSubscription,
		}
	}
})
</script>
