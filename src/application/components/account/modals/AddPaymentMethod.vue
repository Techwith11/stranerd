<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Add Method</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<add-payment-method :onAddMethodSuccessful="onAddMethodSuccessful"/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AddPaymentMethod from '@application/components/helpers/payments/AddPaymentMethod.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	components: {
		'add-payment-method': AddPaymentMethod
	},
	setup(){
		return {
			closeAccountModal: useStore().modals.closeAccountModal,
			onAddMethodSuccessful: async () => {
				await useStore().modals.closeAccountModal()
			}
		}
	}
})
</script>
