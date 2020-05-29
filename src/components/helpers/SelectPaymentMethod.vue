<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-if="showForm">
			<a class="text-info d-block my-3 small" @click.prevent="backToPaymentMethods"><i class="fas fa-arrow-left mr-2"></i>Back to payment methods</a>
			<add-payment-method :onAddMethodSuccessful="refreshPaymentMethods"/>
		</div>
		<div v-else>
			<div v-if="paymentMethods.length === 0">
				<p class="">No payment method saved. Click below to add a new payment method</p>
				<a class="text-info my-3 d-block" @click.prevent="showFormFields">Add a new payment method(Credit cards, Paypal accounts)</a>
			</div>
			<div v-else>
				<div class="py-2 my-2 rounded px-4 d-flex" v-for="method in paymentMethods" :key="method['.key']" @click="selectMethod(method.token)"
					:class="token === method.token ? 'bg-info text-white' : 'bg-light'">
					<span class="" :for="method.token">{{ method.cardType }}</span>
					<span class="ml-3">{{ method.maskedNumber }}</span>
					<span class="ml-auto"><span class="d-none d-sm-inline">Expires </span>{{ method.expirationDate }}</span>
				</div>
				<a class="text-info d-block my-3 small" @click.prevent="showFormFields">Add another card or payment method</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
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
			onMethodSelected: {
				required: true,
				type: Function
			}
		},
		computed: {
			...mapGetters(['getId']),
		},
		methods: {
			selectMethod(token){
				this.onMethodSelected(token)
				this.token = token
			},
			refreshPaymentMethods(){
				this.showForm = false
				this.token = null
				this.fetchPaymentMethods()
			},
			backToPaymentMethods(){
				this.showForm = this.isLoading
				this.token = null
			},
			async showFormFields(){
				this.showForm = true
				this.onMethodSelected(null)
			},
			async fetchPaymentMethods(){
				this.isLoading = true
				this.paymentMethods = []
				let docs = await firestore.collection(`users/${this.getId}/paymentMethods`).orderBy('dates.createdAt').get()
				docs.forEach(doc => this.paymentMethods.push({ '.key': doc.id, ...doc.data() }))
				this.isLoading = false
			}
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