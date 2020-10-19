<template>
	<div>
		<page-loading v-if="methodLoading"/>
		<template v-if="showForm">
			<a class="text-info d-block my-3 small" @click.prevent="backToPaymentMethods"><i class="fas fa-arrow-left mr-2"></i>Back to payment methods</a>
			<add-payment-method :onAddMethodSuccessful="refreshPaymentMethods"/>
		</template>
		<template v-else>
			<template v-if="cards.length === 0 && accounts.length === 0">
				<p class="">No payment method saved. Click below to add a new payment method</p>
				<a class="text-info my-3 d-block" @click.prevent="showFormFields">Add a new payment method(Credit cards, Paypal accounts)</a>
			</template>
			<template v-else>
				<div v-if="cards.length > 0">
					<h5>Saved Cards</h5>
					<div class="d-flex flex-wrap align-items-center">
						<div class="p-3 m-2 rounded" v-for="card in cards" :key="card.id" @click="selectMethod(card.token)"
							:class="token === card.token ? 'bg-info text-white' : 'bg-light'" style="max-width:180px">
							<p class="text-capitalize font-weight-500 mb-0">
								<img :src="card.image" alt="" width="50px">
								<span class="ml-2">{{ card.type }}</span>
							</p>
							<p class="mb-0">
								<span>Token: {{ card.token }}</span><br>
								<span class="small">{{ card.maskedNumber }}</span><br>
								<span class="small">Expires: {{ card.expirationDate }}</span><br>
							</p>
						</div>
					</div>
					<hr>
				</div>
				<div v-if="accounts.length > 0">
					<h5>Saved Accounts</h5>
					<div class="d-flex flex-wrap align-items-center">
						<div class="p-3 m-2 rounded" v-for="account in accounts" :key="account.id" @click="selectMethod(account.token)"
							:class="token === account.token ? 'bg-info text-white' : 'bg-light'" style="width:180px">
							<p class="text-capitalize font-weight-500 mb-0">
								<img :src="account.image" alt="" width="50px">
								<span class="ml-2">{{ account.type }}</span>
							</p>
							<p class="mb-2">Token: {{ account.token }}</p>
						</div>
					</div>
				</div>
				<a class="text-info d-block my-4" @click.prevent="showFormFields">Add another card or payment method</a>
			</template>
			<div class="d-flex justify-content-center mb-3">
				<img src="@application/assets/images/braintree.png" alt="" width="250px">
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, PropType } from '@vue/composition-api'
import AddPaymentMethod from '@application/components/helpers/payments/AddPaymentMethod.vue'
import { usePaymentMethodsList } from '@application/usecases/payments/paymentMethods'
export default defineComponent({
	setup(props){
		const state = reactive({
			token: '' as string,
			showForm: false
		})
		const { loading: methodLoading, error, validCards: cards, validAccounts: accounts } = usePaymentMethodsList()
		return {
			methodLoading, error, cards, accounts,
			token: computed(() => state.token),
			showForm: computed(() => state.showForm),
			selectMethod: (token: string) => {
				if(!props.loading){
					props.onMethodSelected(token)
					state.token = token
				}
			},
			refreshPaymentMethods: async (token: string | undefined) => {
				state.showForm = false
				state.token = token ?? ''
				if(token){
					const isTokenValid = [...cards.value, ...accounts.value].some((c) => c.token === token)
					isTokenValid ? props.onMethodSelected(token) : null
				}
			},
			backToPaymentMethods: () => {
				state.showForm = methodLoading.value
				state.token = ''
			},
			showFormFields: () => {
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
