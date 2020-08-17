<template>
	<div>
		<helper-spinner v-if="methodLoading"/>
		<div v-if="showForm">
			<a class="text-info d-block my-3 small" @click.prevent="backToPaymentMethods"><i class="fas fa-arrow-left mr-2"></i>Back to payment methods</a>
			<add-payment-method :onAddMethodSuccessful="refreshPaymentMethods"/>
		</div>
		<div v-else>
			<div v-if="methods.length === 0">
				<p class="">No payment method saved. Click below to add a new payment method</p>
				<a class="text-info my-3 d-block" @click.prevent="showFormFields">Add a new payment method(Credit cards, Paypal accounts)</a>
			</div>
			<div v-else>
				<div class="py-2 my-2 rounded px-4 d-flex" v-for="method in methods" :key="method.id" @click="selectMethod(method.token)"
					:class="token === method.token ? 'bg-info text-white' : 'bg-light'">
					<span>{{ method.cardType }}</span>
					<span class="ml-3">{{ method.maskedNumber }}</span>
					<span class="ml-auto"><span class="d-none d-sm-inline">Expires </span>{{ method.expirationDate }}</span>
				</div>
				<a class="text-info d-block my-3 small" @click.prevent="showFormFields">Add another card or payment method</a>
			</div>
			<div class="d-flex justify-content-center mb-3">
				<img src="../../assets/images/braintree.png" alt="" width="250px">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType } from '@vue/composition-api'
import AddPaymentMethod from '@/components/helpers/AddPaymentMethod.vue'
import { usePaymentMethodsList } from '@/usecases/payments/usePaymentMethods'
export default defineComponent({
	setup(props){
		const state = reactive({
			token: null as string | null,
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
				state.token = null
				await fetchPaymentMethods()
			},
			backToPaymentMethods(){
				state.showForm = methodLoading.value
				state.token = null
			},
			async showFormFields(){
				state.showForm = true
				props.onMethodSelected(null)
			}
		}
	},
	props: {
		onMethodSelected: {
			required: true,
			type: Function as PropType<(value: string | null) => void>
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
