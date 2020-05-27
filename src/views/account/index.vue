<template>
	<div class="container py-3" v-if="Object.keys(getUser).length > 0">
		<account-nav />
		<helper-spinner v-if="isLoading" />
		<account-overview v-if="isTabOverview" />
		<account-payment-methods v-if="isTabPaymentMethods" />
		<account-transactions v-if="isTabTransactions" />
		<!--<div class="d-none">
			<div class="mb-3">
				<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_monthly_amateur_plan')">Stranerd Amateur subscription $9.99/month</button>
				<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_yearly_amateur_plan')">Stranerd basic subscription 16% off $100/year</button>
				<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_monthly_intermediate_plan')">Stranerd intermediate subscription $14.99/month</button>
				<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_yearly_intermediate_plan')">Stranerd intermediate subscription 16% off $150/year</button>
				<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_monthly_master_plan')">Stranerd master subscription $19.99/month</button>
				<button class="d-block btn btn-info my-2" @click="subscribe('stranerd_yearly_master_plan')">Stranerd master subscription 16% off $200/year</button>
			</div>
			<div>
				<h4>Status</h4>
				<p>Online: {{ getUser.status.online }}</p>
				<p>Last seen: {{ new Date(getUser.status.lastSeen.seconds * 1000) }}</p>
				<hr>
			</div>
			<div>
				<h4>Dates</h4>
				<p>Registered on: {{ new Date(getUser.dates.registeredAt.seconds * 1000) }}</p>
				<hr>
			</div>
			<div>
				<h4>Account Type</h4>
				<p>Premium: {{ getUser.account.premium }}</p>
				<p>Customer_ID: {{ getUser.account.customer_id }}</p>
				<div v-if="getUser.account.subscription">
					<p>Subscription ID: {{ getUser.account.subscription.id }}</p>
					<p>Subscription Plan: {{ getUser.account.subscription.planId }}</p>
				</div>
				<hr>
			</div>
			<div>
				<h4>Roles</h4>
				<span class="mr-3">Student: {{ !!getUser.roles.isStudent }}</span>
				<span class="mr-3">Tutor: {{ !!getUser.roles.isTutor }}</span>
				<span class="mr-3">Admin: {{ !!getUser.roles.isAdmin }}</span>
				<hr>
			</div>
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
			<div v-if="getUser.chattedWith">
				<h4>Chatted With</h4>
				<p>{{ getUser.chattedWith.join(', ') }}</p>
			</div>
		</div>-->
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
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
			isDev(){ return process.env.NODE_ENV === 'development' },
			isTabOverview(){ return !this.$route.query.tab },
			isTabPaymentMethods(){ return this.$route.query.tab && this.$route.query.tab === 'paymentMethods' },
			isTabTransactions(){ return this.$route.query.tab && this.$route.query.tab === 'transactions' },
		},
		methods:{
			...mapActions(['subscribeToPlan']),
			/*async subscribe(planId){
				if(!this.token){ return new window.Toast({ icon:'error', title: 'No card chosen' }) }
				this.isLoading = true
				await this.subscribeToPlan({ token: this.token, planId })
				this.isLoading = false
			}*/
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