<template>
	<div>
		<helper-spinner v-if="isLoading"/>
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
				<button class="btn btn-primary btn-block" :disabled="!isThereAHoistedFieldInstance" @click.prevent="addCard">Add Credit Card</button>
			</div>
			<hr />
			<div class="d-flex justify-content-center">
				<img src="../../assets/images/4_cards.png" alt="" width="200px">
			</div>
			<div class="form-group text-center">
				<div id="paypalButton"></div>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		data: () => ({
			isLoading: true,
		}),
		props: {
			onAddMethodSuccessful: {
				type: Function,
				required: true
			}
		},
		computed: mapGetters(['isThereAHoistedFieldInstance']),
		methods: {
			...mapActions(['initPaymentFields','createPaymentMethod']),
			async addCard(){
				this.isLoading = true
				try{
					let successful = await this.createPaymentMethod()
					if(successful){
						new window.Toast({ icon: 'success', title: 'Card added successfully' })
						this.onAddMethodSuccessful()
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			},
		},
		components: {
			'helper-spinner': HelperSpinner
		},
		async mounted(){
			await this.initPaymentFields({ onPayPalAuthorization: this.onAddMethodSuccessful })
			this.isLoading = false
		}
	}
</script>
