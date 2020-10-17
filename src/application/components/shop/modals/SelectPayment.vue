<template>
	<div class="m-md-5">
		<page-loading v-if="loading" />
		<div class="d-flex align-items-center justify-content-between my-3">
			<a @click.prevent="setCartModalOverview"><i class="fas fa-arrow-left"></i></a>
			<h4 class="mb-0">Select Payment Method</h4>
			<i></i>
		</div>
		<p>You are about to pay &dollar;{{ cartPrice }} for {{ cartLength }} {{ cartLength === 1 ? 'item' : 'items' }}. Select payment method to use</p>
		<make-payment :amount="cartPrice" :onPaymentSuccessful="onPaymentSuccessful" buttonTitle="Checkout" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCart, useCheckout } from '@application/usecases/shop/cart'
import { Notify } from '@application/config/notifications'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	setup(){
		const { cartLength, cartPrice } = useCart()
		const { loading, checkout } = useCheckout()
		return {
			cartLength, cartPrice, loading,
			setCartModalOverview: useStore().modals.setCartModalOverview,
			onPaymentSuccessful: async () => {
				await Notify({ icon: 'success', title: 'Purchase successful' })
				await checkout()
			}
		}
	}
})
</script>
