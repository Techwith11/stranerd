<template>
	<div class="my-3 bg-white rounded-xl p-3">
		<p class="text-center small font-weight-bold">Subscription</p>
		<div class="row" v-if="isSubscribed">
			<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
				<span class="mr-3 text-primary-dark">Current Plan</span>
				<span>{{ convertToTitle(getUser.account.subscription.planId) }}</span>
			</div>
			<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
				<span class="mr-3 text-primary-dark">Status</span>
				<span>{{ getUser.account.subscription.status }}</span>
			</div>
			<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
				<span class="mr-3 text-primary-dark">Next Billing Date</span>
				<span>{{ getUser.account.subscription.nextBillingDate }}</span>
			</div>
			<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
				<span class="mr-3 text-primary-dark">Plan Price</span>
				<span>{{ getUser.account.subscription.price }}</span>
			</div>
			<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
				<span class="mr-3 text-primary-dark">Questions Left</span>
				<span>{{ getUser.account.questions }} questions</span>
			</div>
			<div class="col-sm-4 d-flex flex-column justify-content-between mb-3">
				<router-link class="text-info" to="/account/transactions">View transactions</router-link>
				<a class="text-info" @click.prevent="cancelSub">
					<i class="fas fa-spinner fa-spin mr-2" v-if="isLoadingCancel"></i>
					<span>Cancel subscription</span>
				</a>
			</div>
		</div>
		<div v-else>
			<p class="lead">
				<span>You are currently not subscribed. </span>
				<router-link to="/pricing-plans" class="text-decoration-none text-info">See our pricing plans</router-link>
			</p>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data: () => ({
		isLoadingCancel: false,
	}),
	computed: {
		...mapGetters(['getUser','isSubscribed']),
	},
	methods: {
		...mapActions(['cancelSubscription']),
		convertToTitle(string){
			let res = string.split('_')
			let plan = res[2]
			let duration = res[1]
			plan = plan[0].toUpperCase() + plan.slice(1)
			return `${plan}(${duration})`
		},
		async cancelSub(){
			if(!this.isLoadingCancel){
				let result = await new window.SweetAlert({
					title: 'Cancel Subscription',
					text: 'Are you sure you want to cancel your subscription',
					icon: 'info',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					cancelButtonText: 'No'
				})
				if (result.value) {
					try{
						this.isLoadingCancel = true
						let res = await this.cancelSubscription()
						if(res){
							new window.Toast({ icon: 'success', title: 'Subscription cancelled successfully' })
						}
					}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
					this.isLoadingCancel = false
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.rounded-xl{
		border-radius: 2.0rem !important;
		box-shadow: 0 1px 2px $text-black;
	}
	.text-primary-dark{ color: $primary-dark }
</style>
