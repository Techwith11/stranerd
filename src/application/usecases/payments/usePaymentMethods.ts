import { computed, reactive } from '@vue/composition-api'
import { MethodEntity } from '@root/modules/payments/domain/entities/method'
import { GetPaymentMethods } from '@root/modules/payments'
import store from '@/store'

const globalState = reactive({
	methods: [] as MethodEntity[],
	fetched: false,
	loading: false,
	error: ''
})

const fetchPaymentMethods = async () => {
	globalState.methods = await GetPaymentMethods.call(store.getters.getId)
}

export const usePaymentMethodsList = () => {
	if(!globalState.fetched) fetchPaymentMethods().then(() => globalState.fetched = true).catch((e) => globalState.error = e.message)
	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		methods: computed(() => globalState.methods),
		fetchPaymentMethods
	}
}
