<template>
	<div>
		<select-payment-method :onMethodSelected="setToken" :loading="isLoading"/>
		<button class="w-100 btn-success" v-if="this.token !== null" @click="pay">
			<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
			{{ buttonTitle }}
		</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import SelectPaymentMethod from '@/components/helpers/SelectPaymentMethod'
export default {
	data: () => ({
		isLoading: false,
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
	methods: {
		...mapActions(['makePayment']),
		setToken(token){ this.token = token },
		async pay(){
			this.isLoading = true
			try{
				const successful = await this.makePayment({ token: this.token, amount: this.amount })
				if(successful){
					await this.onPaymentSuccessful(successful)
				}
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			this.isLoading = false
		},
	},
	components: {
		'select-payment-method': SelectPaymentMethod
	}
}
</script>