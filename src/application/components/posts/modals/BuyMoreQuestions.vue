<template>
	<div class="m-md-5">
		<helper-spinner v-if="loading" />
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Buy More Questions</h4>
			<a @click.prevent="closePostModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div>
			<p>You are about to buy {{ quantity }} questions for &dollar;{{ price }}. Select payment method to use</p>
			<make-payment :amount="price" :onPaymentSuccessful="onPaymentSuccessful" buttonTitle="Purchase" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useMoreQuestions } from '@/usecases/shop/cart'
import { useStore } from '@/usecases/store'
export default defineComponent({
	setup(){
		const { loading, price, quantity, addQuestions } = useMoreQuestions()
		const onPaymentSuccessful = addQuestions
		return {
			loading, price, quantity, onPaymentSuccessful,
			closePostModal: useStore().modals.closePostModal
		}
	}
})
</script>
