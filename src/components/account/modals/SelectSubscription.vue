<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select subscription</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div v-if="page === 1">
			<div class="d-flex flex-column flex-sm-row">
				<div class="flex-grow-1 mb-4 mb-sm-0" v-for="(plan,index) in plans" :key="index">
					<div class="border border-success rounded p-2" @click="planId = plan.monthlyId"
						:class="planId === plan.monthlyId ? 'bg-success text-white' : 'text-success'"
					>
						<h6 class="text-center">{{ plan.title }}</h6>
						<p class="text-center">&dollar;{{ plan.monthly }}/mo</p>
						<ul class="small">
							<li class="">Access to unlimited resources and tutors</li>
							<li>{{ plan.questions }} free questions per month</li>
						</ul>
					</div>
					<div class="small text-center my-2 border border-info rounded p-2" @click="planId = plan.yearlyId"
						:class="planId === plan.yearlyId ? 'bg-info text-white' : 'text-info'"
					>save 16% and pay &dollar;{{ plan.yearly }} for a year</div>
				</div>
			</div>
			<div class="d-flex justify-content-end">
				<button class="btn" :class="planId ? 'btn-success' : 'btn-secondary opacity-25'" :disabled="planId === null" @click="goToNextPage">Continue</button>
			</div>
		</div>
		<div v-else>
			<p>Select payment method to use to pay for subscription</p>
			<select-payment-method :onMethodSelected="setToken" :loading="isLoading" />
			<div class="d-flex justify-content-end">
				<button class="btn" :class="token ? 'btn-success' : 'btn-secondary opacity-25'" :disabled="token === null" @click="subscribe">
					<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
					Subscribe
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import SelectPaymentMethod from "@/components/helpers/SelectPaymentMethod"
	export default {
		data: () => ({
			plans: [
				{
					title: 'Amateur Plan',
					monthly: 9.99,
					yearly: 100,
					questions: 5,
					monthlyId: 'stranerd_monthly_amateur_plan',
					yearlyId: 'stranerd_yearly_amateur_plan'
				},
				{
					title: 'Intermediate Plan',
					monthly: 19.99,
					yearly: 200,
					questions: 9,
					monthlyId: 'stranerd_monthly_intermediate_plan',
					yearlyId: 'stranerd_yearly_intermediate_plan'
				},
				{
					title: 'Master Plan',
					monthly: 49.99,
					yearly: 500,
					questions: 15,
					monthlyId: 'stranerd_monthly_master_plan',
					yearlyId: 'stranerd_yearly_master_plan'
				}
			],
			page: 1,
			planId: null,
			token: null,
			isLoading: false
		}),
		methods: {
			...mapActions(['closeAccountModal','subscribeToPlan']),
			goToNextPage(){ this.page = 2 },
			setToken(token){ this.token = token },
			async subscribe(){
				this.isLoading = true
				try{
					await this.subscribeToPlan({token: this.token, planId: this.planId })
					new window.Toast({ icon: 'success', title: 'Subscription created successfully' })
					this.closeAccountModal()
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		computed: {
			...mapGetters(['getUser','isSubscribed'])
		},
		mounted(){
			if(this.isSubscribed){
				this.planId = this.getUser.account.subscription.planId
			}
		},
		components: {
			'select-payment-method': SelectPaymentMethod
		}
	}
</script>