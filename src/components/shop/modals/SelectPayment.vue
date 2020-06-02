<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<a @click.prevent="setCartModalOverview"><i class="fas fa-arrow-left"></i></a>
			<h4 class="mb-0">Select Payment Method</h4>
			<i></i>
		</div>
		<p>You are about to pay &dollar;{{ getCartPrice }} for {{ getCartLength }} {{ getCartLength > 1 ? 'items' : 'item' }}. Select payment method to use</p>
		<helper-make-payment :amount="getCartPrice" :onPaymentSuccessful="onPaymentSuccessful" buttonTitle="Checkout" />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import MakePayment from '@/components/helpers/MakePayment'
	export default {
		computed: mapGetters(['getId','getCartPrice','getCartLength']),
		methods: {
			...mapActions(['setCartModalOverview','checkout']),
			async onPaymentSuccessful(){
				new window.Toast({ icon: 'success', title: 'Purchase successful' })
				await this.checkout()
			}
		},
		components: {
			'helper-make-payment': MakePayment
		}
	}
</script>