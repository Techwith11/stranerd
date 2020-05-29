<template>
	<div class="container py-3" v-if="getUser && getUser.bio">
		<account-nav />
		<helper-spinner v-if="isLoading" />
		<account-overview v-if="isTabOverview" />
		<account-payment-methods v-if="isTabPaymentMethods" />
		<account-transactions v-if="isTabTransactions" />
		<!--<div class="d-none">
			<div v-if="getUser.roles.isTutor">
				<h4>Tutor details</h4>
				<p>CanTeach: {{ getUser.tutor.canTeach }}</p>
				<div v-for="course in getUser.tutor.courses" :key="'upgrade/'+course">
					<p>Level {{ getUser.tutor['levels'][course] }} {{ course }}</p>
					<ul v-for="upgrade in Object.entries(getUser.tutor.upgrade[course]).sort((a,b) => a[0] - b[0])" :key="upgrade[0]">
						<li class="font-weight-bold">Level {{ upgrade[0] }}</li>
						<li>Score: {{ upgrade[1].score }}</li>
						<li class="mb-3">On: {{ new Date(upgrade[1].takenAt.seconds * 1000) }}</li>
					</ul>
				</div>
				<p>Qualification: {{ getUser.tutor.qualification }}</p>
				<p>Rating: {{ getUser.tutor.rating }}</p>
				<hr>
			</div>
		</div>-->
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import HelperSpinner from '@/components/helpers/Spinner'
	import AccountNav from '@/components/account/single/AccountNav'
	import AccountOverview from '@/components/account/single/AccountOverview'
	import AccountPaymentMethods from '@/components/account/single/AccountPaymentMethods'
	import AccountTransactions from '@/components/account/single/AccountTransactions'
	export default {
		name: 'Account',
		data: () => ({
			isLoading: true,
			paymentMethods: [],
			token: ''
		}),
		computed: {
			...mapGetters(['getUser','getId']),
			isTabOverview(){ return !this.$route.query.tab },
			isTabPaymentMethods(){ return this.$route.query.tab && this.$route.query.tab === 'paymentMethods' },
			isTabTransactions(){ return this.$route.query.tab && this.$route.query.tab === 'transactions' },
		},
		async mounted(){
			this.isLoading = false
		},
		components: {
			'helper-spinner': HelperSpinner,
			'account-nav': AccountNav,
			'account-overview': AccountOverview,
			'account-payment-methods': AccountPaymentMethods,
			'account-transactions': AccountTransactions
		}
	}
</script>