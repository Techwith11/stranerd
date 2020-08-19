<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Pay for Session</h4>
			<a @click.prevent="cancelSessionAndCloseModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<p class="text-muted">You are about to pay &dollar;{{ getCurrentSession.price }} for a {{ getLength }} session. Select payment method to use</p>
		<helper-make-payment :amount="getAmount" :onPaymentSuccessful="onPaymentSuccessful" buttonTitle="Pay for session" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MakePayment from '@/components/helpers/payments/MakePayment'
export default {
	computed: {
		...mapGetters(['getId','getCurrentSession']),
		getAmount(){ return this.getCurrentSession.price },
		getLength(){
			if(this.getCurrentSession.duration >= 1){
				return this.getCurrentSession.duration === 1 ? `${this.getCurrentSession.duration} hour` : `${this.getCurrentSession.duration} hours`
			}
			else{
				const minutes = Math.floor(this.getCurrentSession.duration * 60)
				return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`
			}
		},
	},
	methods: {
		...mapActions(['cancelSessionAndCloseModal','payForSession']),
		async onPaymentSuccessful(){
			new window.Toast({ icon: 'success', title: 'Payment successful' })
			await this.payForSession()
		}
	},
	components: {
		'helper-make-payment': MakePayment
	}
}
</script>
