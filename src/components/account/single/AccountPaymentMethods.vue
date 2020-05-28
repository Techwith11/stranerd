<template>
	<div>
		<helper-spinner v-if="isLoading"/>
		<div v-else>
			<helper-message message="You dont have any payment method saved. Try adding one now" v-if="paymentMethods.length === 0" />
			<div v-else>
				<payment-method-card :method="method" v-for="method in paymentMethods" :key="method['.key']"  :onRemove="removeMethod"/>
			</div>
			<button class="floating-button" @click="setAccountModalStateAddPaymentMethod"><i class="fas fa-plus"></i></button>
		</div>
	</div>
</template>

<script>
	import { firestore } from '@/config/firebase'
	import { mapGetters, mapActions } from 'vuex'
	import HelperSpinner from '@/components/helpers/Spinner'
	import HelperMessage from '@/components/helpers/Message'
	import PaymentMethodCard from "@/components/account/single/PaymentMethodCard"
	export default {
		data: () => ({
			paymentMethods: [],
			isLoading: true
		}),
		computed: {
			...mapGetters(['getId']),
		},
		methods: {
			...mapActions(['setAccountModalStateAddPaymentMethod','removePaymentMethod']),
			async fetchPaymentMethods(){
				let docs = await firestore.collection(`users/${this.getId}/paymentMethods`).orderBy('dates.createdAt').get()
				docs.forEach(doc => this.paymentMethods.push({ '.key': doc.id, ...doc.data() }))
			},
			async removeMethod(method){
				let result = await new window.SweetAlert({
					title: 'Remove method',
					text: 'Are you sure you want to remove this payment method?',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Remove'
				})
				if (result.value) {
					try{
						this.isLoading = true
						await this.removePaymentMethod(method['.key'])
						this.paymentMethods = this.paymentMethods.filter(x => x['.key'] !== method['.key'])
					}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
					this.isLoading = false
				}
			}
		},
		async mounted() {
			await this.fetchPaymentMethods()
			this.isLoading = false
		},
		components: {
			'helper-spinner': HelperSpinner,
			'helper-message': HelperMessage,
			'payment-method-card': PaymentMethodCard
		}
	}
</script>