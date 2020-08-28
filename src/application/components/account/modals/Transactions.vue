<template>
  <div class="m-md-5">
    <div class="d-flex align-items-center justify-content-between my-3">
      <i></i>
      <h4 class="mb-0">All Transactions</h4>
      <a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
    </div>
    <helper-spinner v-if="isLoading"/>
    <div v-else>
      <helper-message message="You haven't made any transaction on Stranerd" v-if="transactions.length === 0" />
      <div v-else>
        <transaction-card v-for="transaction in transactions" :key="transaction['.key']" :transaction="transaction" />
        <div class="d-flex justify-content-end my-3" v-if="hasMore">
          <button class="btn-success" @click="fetchOlderTransactions">
            <i class="fas fa-spinner fa-spin mr-2" v-if="isOlderTransactionsLoading"></i>
            <span>Fetch More</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { firestore } from '@/config/firebase'
import TransactionCard from '@/components/account/single/TransactionCard'
export default {
	data: () => ({
		isLoading: true,
		isOlderTransactionsLoading: false,
		transactions: [],
		paginationLimit: 24,
		hasMore: true
	}),
	components: {
		'transaction-card': TransactionCard
	},
	async mounted(){
		await this.getTransactions()
		this.isLoading = false
	},
	computed: {
		...mapGetters(['getId'])
	},
	methods: {
	  ...mapActions(['closeAccountModal']),
		async getTransactions(){
			try{
				let docs = firestore.collection(`users/${this.getId}/transactions`).orderBy('dates.createdAt','desc')
					.limit(this.paginationLimit)
				const lastItem = this.transactions[this.transactions.length - 1]
				if(lastItem){
					docs = docs.where('dates.createdAt','<',lastItem.dates.createdAt)
				}
				docs = await docs.get()
				this.hasMore = docs.size >= this.paginationLimit
				docs.forEach((doc) => this.transactions.push({ '.key': doc.id, ...doc.data() }))
			}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching transactions. Try refreshing the page' }) }
		},
		async fetchOlderTransactions(){
			this.isOlderTransactionsLoading = true
			await this.getTransactions()
			this.isOlderTransactionsLoading = false
		}
	}
}
</script>
