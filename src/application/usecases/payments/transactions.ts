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

const fetchTransactions = async () => {
	globalState.loading = true
	globalState.transactions = await GetTransactions.call(useStore().auth.getId.value)
	globalState.loading = false
}

const checkForNewTransactions = async () => {
	globalState.loading = true
	const date = globalState.transactions[0]?.createdAt ?? undefined
	const transactions = await GetTransactions.call(useStore().auth.getId.value, date)
	globalState.transactions.unshift(...transactions)
	globalState.loading = false
}

export const useTransactionsList = () => {
	if(!globalState.fetched) fetchTransactions()
		.then(() => {
			globalState.fetched = true
			if(globalState.transactions.length === 0) globalState.error = 'No transactions made at the moment'
		}).catch((e) => globalState.error = e.message)
	else checkForNewTransactions()
	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		transactions: computed(() => globalState.transactions),
		fetchTransactions
	}
}
