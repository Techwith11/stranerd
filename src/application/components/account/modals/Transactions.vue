<template>
  <div class="m-md-5">
    <div class="d-flex align-items-center justify-content-between my-3">
      <i></i>
      <h4 class="mb-0">All Transactions</h4>
      <a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
    </div>
    <helper-spinner v-if="loading"/>
    <template v-else>
      <helper-message :message="error" v-if="error" />
      <div v-else>
        <transaction-card v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TransactionCard from '@application/components/account/single/TransactionCard.vue'
import { useStore } from '@application/usecases/store'
import { useTransactionsList } from '@application/usecases/payments/transactions'
export default defineComponent({
	setup(){
		const { loading, transactions, error } = useTransactionsList()
		return {
			loading, transactions, error,
			closeAccountModal: useStore().modals.closeAccountModal
		}
	},
	components: {
		'transaction-card': TransactionCard
	}
})
</script>
