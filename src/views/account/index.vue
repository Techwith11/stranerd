<template>
	<div class="container py-3" v-if="getUser && getUser.bio">
		<account-nav />
		<account-overview v-if="isTabOverview" />
		<account-payment-methods v-if="isTabPaymentMethods" />
		<account-transactions v-if="isTabTransactions" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import AccountNav from '@/components/account/single/AccountNav'
	import AccountOverview from '@/components/account/single/AccountOverview'
	import AccountPaymentMethods from '@/components/account/single/AccountPaymentMethods'
	import AccountTransactions from '@/components/account/single/AccountTransactions'
	export default {
		name: 'Account',
		computed: {
			...mapGetters(['getUser']),
			isTabOverview(){ return !this.$route.query.tab },
			isTabPaymentMethods(){ return this.$route.query.tab && this.$route.query.tab === 'paymentMethods' },
			isTabTransactions(){ return this.$route.query.tab && this.$route.query.tab === 'transactions' },
		},
		async mounted(){
			this.isLoading = false
		},
		components: {
			'account-nav': AccountNav,
			'account-overview': AccountOverview,
			'account-payment-methods': AccountPaymentMethods,
			'account-transactions': AccountTransactions
		}
	}
</script>