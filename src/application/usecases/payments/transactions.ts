import { computed, reactive } from '@vue/composition-api'
import { TransactionEntity } from '@root/modules/payments/domain/entities/transaction'
import { GetTransactions } from '@root/modules/payments'
import { useStore } from '@/usecases/store'

const globalState = reactive({
	transactions: [] as TransactionEntity[],
	fetched: false,
	loading: false,
	error: ''
})

export const resetTransactions = () => {
	globalState.transactions = []
	globalState.fetched = false
	globalState.loading = false
	globalState.error = ''
}

const fetchTransactions = async () => {
	globalState.loading = true
	globalState.transactions = await GetTransactions.call(useStore().auth.getId.value)
	globalState.loading = false
}

export const useTransactionsList = () => {
	if(!globalState.fetched) fetchTransactions().then(() => globalState.fetched = true).catch((e) => globalState.error = e.message)
	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		transactions: computed(() => globalState.transactions),
		fetchTransactions
	}
}
