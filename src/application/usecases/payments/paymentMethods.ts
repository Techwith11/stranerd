import { computed, reactive } from '@vue/composition-api'
import { MethodEntity } from '@root/modules/payments/domain/entities/method'
import { GetPaymentMethods, RemovePaymentMethod } from '@root/modules/payments'
import { useStore } from '@/usecases/store'
import { Alert, Notify } from '@/config/notifications'

const globalState = reactive({
	methods: [] as MethodEntity[],
	fetched: false,
	loading: false,
	error: ''
})

const fetchPaymentMethods = async () => {
	globalState.loading = true
	globalState.methods = await GetPaymentMethods.call(useStore().auth.getId.value)
	globalState.loading = false
}

export const usePaymentMethodsList = () => {
	if(!globalState.fetched) fetchPaymentMethods().then(() => globalState.fetched = true).catch((e) => globalState.error = e.message)
	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		methods: computed(() => globalState.methods),
		validMethods: computed(() => globalState.methods.filter((m) => !m.expired)),
		fetchPaymentMethods
	}
}

export const useDeletePaymentMethod = (method: MethodEntity) => {
	const state = reactive({ loading: false })
	const deleteMethod = async () => {
		if(!state.loading){
			const result = await Alert({
				title: 'Remove method',
				text: 'Are you sure you want to remove this payment method?',
				icon: 'info',
				confirmButtonText: 'Remove'
			})
			if (result.value) {
				state.loading = true
				try {
					await RemovePaymentMethod.call(useStore().auth.getId.value, method.id)
					globalState.methods = globalState.methods.filter((m) => m.id !== method.id)
				} catch(e) {
					await Notify({ title: e.message, icon: 'error' })
				}
				state.loading = false
			}

		}
	}
	return {
		loading: computed(() => state.loading),
		deleteMethod
	}
}
