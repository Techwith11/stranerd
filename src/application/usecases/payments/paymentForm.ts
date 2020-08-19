import { computed, reactive, Ref, ref } from '@vue/composition-api'
import braintree, { client, hostedFields } from 'braintree-web'
import { CreatePaymentMethod, GetClientToken } from '@root/modules/payments'
import { Notify } from '@/config/notifications'
import { useStore } from '@/usecases/store'

const hostedFieldsInstance: Ref<braintree.HostedFields | undefined> = ref(undefined)

const initializeFields = async () => {
	const { braintree: braintreeToken } = await GetClientToken.call()
	const clientInstance = await client.create({ authorization: braintreeToken })
	const month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
	const year = new Date().getFullYear()
	const options = {
		client: clientInstance,
		styles: { input: { 'font-size': '14px' } },
		fields: {
			number: { selector: '#creditCardNumber', placeholder: 'Enter Credit Card' },
			cvv: { selector: '#cvv', placeholder: 'Enter CVV' },
			expirationDate: { selector: '#expireDate', placeholder: `${month}/${year + 1}` }
		}
	}
	hostedFieldsInstance.value = await hostedFields.create(options)
}

export const usePaymentForm = () => {
	const state = reactive({
		loading: false
	})
	const initializeHostedFields = async () => {
		state.loading = true
		await initializeFields().catch(async (e) => await Notify({ title: e.message, icon: 'error' }))
		state.loading = false
	}
	return {
		loading: computed(() => state.loading),
		isThereAHoistedFieldInstance: computed(() => hostedFieldsInstance.value !== undefined),
		initializeHostedFields
	}
}

export const useCreatePaymentMethods = () => {
	const state = reactive({
		loading: false
	})
	const createPaymentMethod = async () => {
		if(hostedFieldsInstance.value !== undefined){
			state.loading = true
			const { nonce } = await hostedFieldsInstance.value.tokenize()
			const res = await CreatePaymentMethod.call(useStore().auth.getId.value, nonce)
			if(res) await Notify({ title: 'Payment method saved', icon: 'success' })
			else await Notify({ title: 'Error saving payment method', icon: 'error' })
			state.loading = false
			return res
		}
	}
	return {
		loading: computed(() => state.loading),
		createPaymentMethod
	}
}

/*let paypalInstance = await paypalCheckout.create({ client: clientInstance, client_id: tokens.paypal })
			paypal.Button.render({
				env: 'sandbox',
				style: { label: 'paypal', size: 'large', shape: 'rect' },
				payment: () => paypalInstance.createPayment({
					flow: 'vault',
					displayName: 'Stranerd',
					currency: 'USD'
				}),
				onAuthorize: async (info, options) => {
					let payload = await paypalInstance.tokenizePayment(options)
					let result = await helpers.createPaymentMethod({
						id: getters.getId,
						nonce: payload.nonce
					})
					if(result === true){
						new window.Toast({ icon: 'success', title: 'Paypal account added successfully' })
						data.onPayPalAuthorization(result)
					}else {
						new window.Toast({icon: 'error', title: 'Error adding paypal account'})
					}
					data.onPayPalAuthorization(result)
				},
				onCancel: () => new window.Toast({ icon: 'warning', title: 'Account addition cancelled.' }),
				onError: error => new window.Toast({ icon: 'error', title: error.message })
			}, '#paypalButton')*/
