<template>
	<div class="m-md-5">
		<helper-spinner v-if="isLoading"/>
		<div>
			<div class="d-flex align-items-center justify-content-between my-3">
				<i></i>
				<h4 class="mb-0">Pay for Session</h4>
				<i class="fas fa-times text-danger" @click="this.cancelSessionAndCloseModal"></i>
			</div>
			<form>
				<div class="form-group">
					<label>Credit Card Number</label>
					<div id="creditCardNumber" class="form-control"></div>
				</div>
				<div class="form-group">
					<div class="row">
						<div class="col-6">
							<label>Expire Date</label>
							<div id="expireDate" class="form-control"></div>
						</div>
						<div class="col-6">
							<label>CVV</label>
							<div id="cvv" class="form-control"></div>
						</div>
					</div>
				</div>
				<div class="text-center">
					<button class="btn btn-primary btn-block" @click.prevent="makePayment" :disabled="!this.canPay">Pay with Credit Card</button>
				</div>
				<hr />
				<div class="form-group text-center">
					<div id="paypalButton"></div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		data: () => ({
			isLoading: true
		}),
		computed: {
			...mapGetters(['getCurrentSession','canPay'])
		},
		methods: {
			...mapActions(['cancelSessionAndCloseModal','initializePaymentFields','pay','payForSession']),
			async makePayment(){
				this.isLoading = true
				let res = await this.pay(this.getCurrentSession.price)
				this.payForSession(res)
				this.isLoading = false
			},
			onPaymentSuccessful(result){
				if(result.success){
					this.payForSession(result)
				}
			}
		},
		components: {
			'helper-spinner': HelperSpinner
		},
		async mounted(){
			await this.initializePaymentFields({
				ids: {
					creditCard: '#creditCardNumber',
					cvv: '#cvv',
					expire: '#expireDate',
					paypal: '#paypalButton'
				},
				amount: this.getCurrentSession.price,
				onPaypalSuccessful: this.onPaymentSuccessful
			})
			this.isLoading = false
		}
	}
</script>