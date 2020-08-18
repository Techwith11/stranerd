<template>
	<div>
		<helper-spinner v-if="methodLoading"/>
		<template v-if="showForm">
			<a class="text-info d-block my-3 small" @click.prevent="backToPaymentMethods"><i class="fas fa-arrow-left mr-2"></i>Back to payment methods</a>
			<add-payment-method :onAddMethodSuccessful="refreshPaymentMethods"/>
		</template>
		<template v-else>
			<template v-if="methods.length === 0">
				<p class="">No payment method saved. Click below to add a new payment method</p>
				<a class="text-info my-3 d-block" @click.prevent="showFormFields">Add a new payment method(Credit cards, Paypal accounts)</a>
			</template>
			<template v-else>
				<div class="py-2 my-2 rounded px-4 d-flex" v-for="method in methods" :key="method.id" @click="selectMethod(method.token)"
					:class="token === method.token ? 'bg-info text-white' : 'bg-light'">
					<span>{{ method.cardType }}</span>
					<span class="ml-3">{{ method.maskedNumber }}</span>
					<span class="ml-auto"><span class="d-none d-sm-inline">Expires </span>{{ method.expirationDate }}</span>
				</div>
				<a class="text-info d-block my-3 small" @click.prevent="showFormFields">Add another card or payment method</a>
			</template>
			<div class="d-flex justify-content-center mb-3">
				<img src="../../assets/images/braintree.png" alt="" width="250px">
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType } from '@vue/composition-api'
import AddPaymentMethod from '@/components/helpers/AddPaymentMethod.vue'
import { usePaymentMethodsList } from '@/usecases/payments/paymentMethods'
export default defineComponent({
	setup(props){
		const state = reactive({
			token: '' as string,
			showForm: false
		})
		const { loading: methodLoading, error, methods, fetchPaymentMethods } = usePaymentMethodsList()
		return {
			methodLoading, error, methods, fetchPaymentMethods,
			token: computed(() => state.token),
			showForm: computed(() => state.showForm),
			selectMethod: (token: string) => {
				if(!props.loading){
					props.onMethodSelected(token)
					state.token = token
				}
			},
			refreshPaymentMethods: async () => {
				state.showForm = false
				state.token = ''
				await fetchPaymentMethods()
			},
			backToPaymentMethods(){
				state.showForm = methodLoading.value
				state.token = ''
			},
			async showFormFields(){
				state.showForm = true
				props.onMethodSelected('')
			}
		}
	},
	props: {
		onMethodSelected: {
			required: true,
			type: Function as PropType<(value: string) => void>
		},
		loading: {
			type: Boolean,
			required: true
		}
	},
	components: {
		'add-payment-method': AddPaymentMethod
	}
})
</script>
