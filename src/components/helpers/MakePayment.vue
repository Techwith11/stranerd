<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<form v-if="showForm">
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
			<div class="form-group text-center">
				<div id="paypalButton"></div>
			</div>
		</form>
		<div v-else>
			<div v-if="paymentMethods.length === 0">
				<p class="lead">No payment method saved. Click below to add a new payment method</p>
				<a class="text-info mt-4" @click.prevent="showFormFields">Another new payment method(Credit cards, Paypal accounts)</a>
			</div>
			<div v-else>
				<div class="py-2 my-2 rounded px-4 d-flex" v-for="method in paymentMethods" :key="method['.key']" @click="token = method.token"
					:class="token === method.token ? 'bg-success text-white' : 'bg-light'">
					<span class="" :for="method.token">{{ method.cardType }}</span>
					<span class="ml-3">{{ method.maskedNumber }}</span>
					<span class="ml-auto">Expires {{ method.expirationDate }}</span>
				</div>
				<a class="text-info mt-4" @click.prevent="showFormFields">Add another card or payment method</a>
			</div>
			<button class="mt-4 w-100 accent-button" :disabled="cannotPay" @click="pay">{{ buttonTitle }}</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	export default {
		data: () => ({
			isLoading: false,
			showForm: false,
			paymentMethods: [],
			token: null
		}),
		props: {
			amount: {
				required: true,
				type: Number
			},
			onPaymentSuccessful: {
				required: true,
				type: Function
			},
			buttonTitle: {
				required: true,
				type: String
			}
		},
		computed: {
			...mapGetters(['getId','isThereAHoistedFieldInstance']),
			cannotPay(){ return this.isLoading === true || this.token === null },
		},
		methods: {
			...mapActions(['initPaymentFields','createPaymentMethod','makePayment']),
			refreshPaymentMethods(){
				this.showForm = false
				this.fetchPaymentMethods()
			},
			async showFormFields(){
				this.isLoading = true
				this.showForm = true
				await this.initPaymentFields({ onPayPalAuthorization: this.refreshPaymentMethods })
				this.isLoading = false
			},
			async fetchPaymentMethods(){
				this.isLoading = true
				this.paymentMethods = []
				let docs = await firestore.collection(`users/${this.getId}/paymentMethods`).get()
				docs.forEach(doc => this.paymentMethods.push({ '.key': doc.id, ...doc.data() }))
				this.isLoading = false
			},
			async addCard(){
				this.isLoading = true
				try{
					let successful = await this.createPaymentMethod()
					if(successful){
						new window.Toast({ icon: 'success', title: 'Card added successfully' })
						this.refreshPaymentMethods()
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			},
			async pay(){
				this.isLoading = true
				try{
					let successful = await this.makePayment({ token: this.token, amount: this.amount })
					if(successful){
						await this.onPaymentSuccessful(successful)
					}
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			},
		},
		components: {
			'helper-spinner': HelperSpinner
		},
		async mounted(){
			await this.fetchPaymentMethods()
		}
	}
</script>