<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Buy More</h4>
			<a @click.prevent="closePostModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div>
			<p>You are about to buy {{ quantity }} questions for &dollar;{{ price }}. Select payment method to use</p>
			<helper-make-payment :amount="price" :onPaymentSuccessful="onPaymentSuccessful" buttonTitle="Purchase" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MakePayment from '@/components/helpers/payments/MakePayment'
export default {
	data: () => ({
		price: 10.00,
		quantity: 3
	}),
	computed: mapGetters(['getId','getCartPrice','getCartLength']),
	methods: {
		...mapActions(['closePostModal','addMoreQuestions','setPostModalNotify']),
		async onPaymentSuccessful(){
			new window.Toast({ icon: 'success', title: 'Purchase successful' })
			try{
				await this.addMoreQuestions(this.quantity)
				new window.Toast({ type: 'success', title: 'Questions added to profile.' })
				this.setPostModalNotify()
			}catch(error){ new window.Toast({ type: 'error', title: 'Failed adding questions to profile.' }) }
		}
	},
	components: {
		'helper-make-payment': MakePayment
	}
}
</script>
