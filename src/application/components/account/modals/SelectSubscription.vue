<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select subscription</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div v-if="page === 1">
			<div class="d-flex flex-column flex-sm-row">
				<div class="flex-grow-1 mb-4 mb-sm-0 mr-sm-1" v-for="plan in getPlans" :key="plan['.key']">
					<div class="border border-success rounded p-2 pointer" @click="planId = plan.monthlyId"
						:class="planId === plan.monthlyId ? 'bg-success text-white' : 'text-success'"
					>
						<h5 class="text-center">{{ plan.title }}</h5>
						<p class="text-center">&dollar;{{ plan.monthlyPrice }}/mo</p>
						<p class="text-center small">{{ plan.description }}</p>
						<ul class="small">
							<li class="">Access to unlimited resources and tutors</li>
							<li>{{ plan.questions }} questions per month</li>
						</ul>
					</div>
					<div class="small text-center my-2 border border-info rounded p-2 pointer" @click="planId = plan.yearlyId"
						:class="planId === plan.yearlyId ? 'bg-info text-white' : 'text-info'">
						save 16% and pay &dollar;{{ plan.yearlyPrice }} for a year
					</div>
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
		...mapGetters(['getUser','isSubscribed','getPlans'])
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

<style lang="scss" scoped>
	.pointer{
		cursor: pointer !important;
		* {
			cursor: pointer !important;
		}
	}
</style>