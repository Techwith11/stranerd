import { computed, reactive } from '@vue/composition-api'
import { TransactionEntity } from '@modules/payments/domain/entities/transaction'
import { GetTransactions } from '@modules/payments'
import { useStore } from '@application/usecases/store'

const globalState = reactive({
	transactions: [] as TransactionEntity[],
	fetched: false,
	loading: false,
	error: ''
})

const fetchTransactions = async () => {
	globalState.loading = true
	globalState.transactions = await GetTransactions.call(useStore().auth.getId.value)
	globalState.loading = false
}

//TODO: Implement caching strategy for fetched transactions or move to listeners
export const useTransactionsList = () => {
	fetchTransactions().then(() => {
		globalState.fetched = true
		if(globalState.transactions.length === 0) globalState.error = 'No transactions made at the moment'
	}).catch((e) => globalState.error = e.message)

	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		transactions: computed(() => globalState.transactions),
		fetchTransactions
	}
}
