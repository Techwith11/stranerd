<template>
	<div>
		<select-payment-method :onMethodSelected="setToken" :loading="loading"/>
		<button class="w-100 btn-success" v-if="token" @click="pay" :disabled="loading">
			<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
			{{ buttonTitle }}
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api'
import SelectPaymentMethod from '@/components/helpers/SelectPaymentMethod.vue'
import { usePayment } from '@/usecases/payments/usePayment'
export default defineComponent({
	props: {
		amount: {
			required: true,
			type: Number
		},
		onPaymentSuccessful: {
			required: true,
			type: Function as PropType<(successful: boolean) => void>
		},
		buttonTitle: {
			required: true,
			type: String
		}
	},
	setup(props){
		const token = ref('')
		const setToken = (t: string) => token.value = t
		const { loading, makePayment } = usePayment()
		const pay = async () => {
			const successful = await makePayment(props.amount,token.value)
			if(successful) await props.onPaymentSuccessful(successful)
		}
		return { loading, pay, token, setToken }
	},
	components: {
		'select-payment-method': SelectPaymentMethod
	}
})
</script>
