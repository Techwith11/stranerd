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
		hoistedFieldInstance: computed(() => hostedFieldsInstance.value),
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
