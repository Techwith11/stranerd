<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Profile Settings</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div class="d-flex flex-column">
			<button class="btn mx-0 btn-warning text-white" @click="setAccountModalEditProfile">Edit Profile</button>
			<button class="btn mx-0 btn-warning text-white" @click="setAccountModalUpdatePassword">Update Password</button>
			<!--<button class="btn mx-0 btn-success" @click="goToPricing">{{ isSubscribed ? 'Change subscription' : 'Subscribe now' }}</button>
			<button class="btn mx-0 btn-danger" @click="cancelSubscription" v-if="isSubscribed" :disabled="loading">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span>Cancel subscription</span>
			</button>-->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCancelSubscription } from '@/usecases/payments/subscription'
import { useStore } from '@/usecases/store'
import router from '@/router'
export default defineComponent({
	setup(){
		const { loading, cancelSubscription } = useCancelSubscription()
		const closeAccountModal = useStore().modals.closeAccountModal
		const goToPricing = () => {
			router.push('/pricing-plans')
			closeAccountModal()
		}
		return {
			loading, cancelSubscription, closeAccountModal, goToPricing,
			isSubscribed: useStore().auth.isSubscribed,
			setAccountModalEditProfile: useStore().modals.setAccountModalEditProfile,
			setAccountModalUpdatePassword: useStore().modals.setAccountModalUpdatePassword,
		}
	}
})
</script>
