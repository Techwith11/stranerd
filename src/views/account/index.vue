<template>
	<div class="container py-3" v-if="getUser && getUser.bio">
		<account-nav />
		<account-payment-methods v-if="isTabPaymentMethods" />
		<account-transactions v-else-if="isTabTransactions" />
		<account-tests v-else-if="isTabTests" />
		<account-overview v-else />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import AccountNav from '@/components/account/single/AccountNav'
	import AccountOverview from '@/components/account/single/AccountOverview'
	import AccountPaymentMethods from '@/components/account/single/AccountPaymentMethods'
	import AccountTransactions from '@/components/account/single/AccountTransactions'
	import AccountTests from '@/components/account/single/AccountTests'
	export default {
		name: 'Account',
		computed: {
			...mapGetters(['getUser','isTutor']),
			isTabPaymentMethods(){ return this.$route.query.tab && this.$route.query.tab === 'paymentMethods' },
			isTabTests(){ return this.$route.query.tab && this.$route.query.tab === 'tests' && this.isTutor },
			isTabTransactions(){ return this.$route.query.tab && this.$route.query.tab === 'transactions' },
		},
		async mounted(){
			this.isLoading = false
		},
		components: {
			'account-nav': AccountNav,
			'account-overview': AccountOverview,
			'account-payment-methods': AccountPaymentMethods,
			'account-transactions': AccountTransactions,
			'account-tests': AccountTests
		}
	}
</script>