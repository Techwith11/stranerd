<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-if="showForm">
			<a class="text-info d-block my-3" @click.prevent="backToPaymentMethods">Back to payment methods</a>
			<add-payment-method :onAddMethodSuccessful="refreshPaymentMethods"/>
		</div>
		<div v-else>
			<div v-if="paymentMethods.length === 0">
				<p class="">No payment method saved. Click below to add a new payment method</p>
				<a class="text-info my-3 d-block" @click.prevent="showFormFields">Add a new payment method(Credit cards, Paypal accounts)</a>
			</div>
			<div v-else>
				<div class="py-2 my-2 rounded px-4 d-flex" v-for="method in paymentMethods" :key="method['.key']" @click="token = method.token"
					:class="token === method.token ? 'bg-info text-white' : 'bg-light'">
					<span class="" :for="method.token">{{ method.cardType }}</span>
					<span class="ml-3">{{ method.maskedNumber }}</span>
					<span class="ml-auto">Expires {{ method.expirationDate }}</span>
				</div>
				<a class="text-info d-block my-3" @click.prevent="showFormFields">Add another card or payment method</a>
			</div>
			<button class="w-100" :class="cannotPay ? 'btn-light' : 'btn-success'" :disabled="cannotPay" @click="pay">{{ buttonTitle }}</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import { firestore } from '@/config/firebase'
	import HelperSpinner from '@/components/helpers/Spinner'
	import AddPaymentMethod from "@/components/helpers/AddPaymentMethod";
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
			...mapGetters(['getId']),
			cannotPay(){ return this.isLoading === true || this.token === null },
		},
		methods: {
			...mapActions(['makePayment']),
			refreshPaymentMethods(){
				this.showForm = false
				this.token = null
				this.fetchPaymentMethods()
			},
			backToPaymentMethods(){
				this.showForm = this.isLoading
				this.token = null
			},
			async showFormFields(){ this.showForm = true },
			async fetchPaymentMethods(){
				this.isLoading = true
				this.paymentMethods = []
				let docs = await firestore.collection(`users/${this.getId}/paymentMethods`).orderBy('dates.createdAt').get()
				docs.forEach(doc => this.paymentMethods.push({ '.key': doc.id, ...doc.data() }))
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
			'helper-spinner': HelperSpinner,
			'add-payment-method': AddPaymentMethod
		},
		async mounted(){
			await this.fetchPaymentMethods()
		}
	}
</script>