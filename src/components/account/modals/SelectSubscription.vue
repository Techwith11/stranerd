<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select subscription</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div v-if="page === 1">
			<div class="d-flex flex-column flex-sm-row">
				<div class="flex-grow-1 mb-4 mb-sm-0">
					<div class="border border-success rounded p-2" @click="planId = 'stranerd_monthly_amateur_plan'"
						:class="planId === 'stranerd_monthly_amateur_plan' ? 'bg-success text-white' : 'text-success'"
					>
						<h6 class="text-center">Stranerd Amateur Plan</h6>
						<p class="text-center">&dollar;10/mo</p>
						<ul class="small">
							<li class="">Access to unlimited resources and tutors</li>
							<li>5 free questions per month</li>
						</ul>
					</div>
					<div class="small text-center my-2 border border-info rounded p-2" @click="planId = 'stranerd_yearly_amateur_plan'"
						:class="planId === 'stranerd_yearly_amateur_plan' ? 'bg-info text-white' : 'text-info'"
					>save 16% and pay &dollar;100 for a year</div>
				</div>
				<div class="flex-grow-1 mb-4 mb-sm-0 mx-sm-2">
					<div class="border border-success rounded p-2" @click="planId = 'stranerd_monthly_intermediate_plan'"
						:class="planId === 'stranerd_monthly_intermediate_plan' ? 'bg-success text-white' : 'text-success'"
					>
						<h6 class="text-center">Stranerd Intermediate Plan</h6>
						<p class="text-center">&dollar;15/mo</p>
						<ul class="small">
							<li class="">Access to unlimited resources and tutors</li>
							<li>10 free questions per month</li>
						</ul>
					</div>
					<div class="small text-center my-2 border border-info rounded p-2" @click="planId = 'stranerd_yearly_intermediate_plan'"
						:class="planId === 'stranerd_yearly_intermediate_plan' ? 'bg-info text-white' : 'text-info'"
					>save 16% and pay &dollar;150 for a year</div>
				</div>
				<div class="flex-grow-1 mb-4 mb-sm-0">
					<div class="border border-success rounded p-2" @click="planId = 'stranerd_monthly_master_plan'"
						:class="planId === 'stranerd_monthly_master_plan' ? 'bg-success text-white' : 'text-success'"
					>
						<h6 class="text-center">Stranerd All Out Master Plan</h6>
						<p class="text-center">&dollar;20/mo</p>
						<ul class="small">
							<li class="">Access to unlimited resources and tutors</li>
							<li>15 free questions per month</li>
						</ul>
					</div>
					<div class="small text-center my-2 border border-info rounded p-2" @click="planId = 'stranerd_yearly_master_plan'"
						:class="planId === 'stranerd_yearly_master_plan' ? 'bg-info text-white' : 'text-info'"
					>save 16% and pay &dollar;200 for a year</div>
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