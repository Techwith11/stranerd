import { computed, reactive, Ref, ref } from '@vue/composition-api'
import braintree, { client, hostedFields, paypalCheckout } from 'braintree-web'
//@ts-ignore
import { AuthorizationData, Button } from 'paypal-checkout'
import { CreatePaymentMethod, GetClientToken } from '@modules/payments'
import { Notify } from '@/config/notifications'
import { useStore } from '@/usecases/store'

const hostedFieldsInstance: Ref<braintree.HostedFields | undefined> = ref(undefined)
const initializeFields = async (onPayPalAuthorization: (token: string | undefined) => void) => {
	const { braintree: braintreeToken, paypal: paypalToken } = await GetClientToken.call()
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
	const paypalInstance = await paypalCheckout.create({ client: clientInstance, authorization: paypalToken })
	Button.render({
		env: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
		style: {
			label: 'paypal', size: 'large', shape: 'rect',
			color: 'gold', tagline: true
		},
		//@ts-ignore
		payment: () => paypalInstance.createPayment({ flow: 'vault', displayName: 'Stranerd', currency: 'USD' }),
		onAuthorize: async (info: AuthorizationData) => {
			const response = await paypalInstance.tokenizePayment(info)
			const result = await CreatePaymentMethod.call(useStore().auth.getId.value, response.nonce)
			if(result.success){
				await Notify({ icon: 'success', title: 'Paypal account added successfully' })
				onPayPalAuthorization(result.token)
			}else {
				await Notify({ icon: 'error', title: 'Error adding paypal account' })
			}
			return response
		},
		onCancel: () => Notify({ icon: 'warning', title: 'Account addition cancelled.' }),
		onError: (error: string) => Notify({ icon: 'error', title: error })
	}, '#paypalButton')
}

export const usePaymentForm = (onPayPalAuthorization: (token: string | undefined) => void) => {
	const state = reactive({
		loading: false
	})
	const initializeHostedFields = async () => {
		state.loading = true
		await initializeFields(onPayPalAuthorization).catch(async (e) => await Notify({ title: e.message, icon: 'error' }))
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
			if(res.success) await Notify({ title: 'Payment method saved', icon: 'success' })
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
