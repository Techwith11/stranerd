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

export const resetPaymentMethods = () => {
	globalState.methods = []
	globalState.fetched = false
	globalState.loading = false
	globalState.error = ''
}

const fetchPaymentMethods = async () => {
	globalState.loading = true
	globalState.methods = await GetPaymentMethods.call(useStore().auth.getId.value)
	globalState.loading = false
}

const checkForNewPaymentMethods = async () => {
	globalState.loading = true
	const date = globalState.methods[0]?.createdAt ?? undefined
	const methods = await GetPaymentMethods.call(useStore().auth.getId.value, date)
	globalState.methods.unshift(...methods)
	globalState.loading = false
}

export const usePaymentMethodsList = () => {
	if(!globalState.fetched) fetchPaymentMethods()
		.then(() => {
			globalState.fetched = true
			if(globalState.methods.length === 0) globalState.error = 'You do not have any payment method saved. Try adding one now.'
		})
		.catch((e) => globalState.error = e.message)
	else checkForNewPaymentMethods().catch((e) => globalState.error = e.message)

	const validCards = computed(() => globalState.methods.filter((m) => !m.expired && m.isCard))
	const validAccounts = computed(() => globalState.methods.filter((m) => !m.expired && !m.isCard))

	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		methods: computed(() => globalState.methods),
		validCards, validAccounts,
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
					const res = await RemovePaymentMethod.call(useStore().auth.getId.value, method.id)
					if(res){
						globalState.methods = globalState.methods.filter((m) => m.id !== method.id)
						await Notify({ title: 'Payment method removed successfully', icon: 'success' })
					}else await Notify({ title: 'Error removing payment method', icon: 'error' })
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
