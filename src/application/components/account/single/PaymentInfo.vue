<template>
	<div class="row">
		<div class="col-md-6">
			<div class="my-3 bg-white rounded-lg shadow-sm p-3">
				<p class="text-center font-weight-500 mb-4 text-muted">Payment Methods</p>
				<div>
					<page-loading v-if="methodsLoading"/>
					<div class="position-relative">
						<helper-message :message="methodsError" v-if="methodsError" />
						<payment-method-card :method="method" v-for="method in methods" :key="method.id"/>
						<div class="d-flex justify-content-end flex-wrap align-items-center" v-if="!methodsLoading">
							<a class="text-info mr-2" @click.prevent="setAccountModalTransactions" v-if="false">View all transactions</a>
							<button class="btn btn-success" @click="setAccountModalAddPaymentMethod"><i class="fas fa-plus mr-1"></i>Add Card</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6 d-none">
			<div class="my-3 bg-white rounded-lg shadow-sm p-3">
				<p class="text-center font-weight-500 mb-4 text-muted">Subscription</p>
				<div class="row" v-if="isSubscribed">
					<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
						<span class="mr-3 text-gold-dark font-weight-500">Current Plan</span>
						<span>{{ convertToTitle(getUser.account.subscription.planId) }}</span>
					</div>
					<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
						<span class="mr-3 text-gold-dark font-weight-500">Status</span>
						<span>{{ getUser.account.subscription.status }}</span>
					</div>
					<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
						<span class="mr-3 text-gold-dark font-weight-500">Next Billing Date</span>
						<span>{{ getUser.account.subscription.nextBillingDate }}</span>
					</div>
					<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
						<span class="mr-3 text-gold-dark font-weight-500">Plan Price</span>
						<span>{{ getUser.account.subscription.price }}</span>
					</div>
					<div class="col-sm-4 d-flex flex-sm-column justify-content-between mb-3">
						<span class="mr-3 text-gold-dark font-weight-500">Questions Left</span>
						<span>{{ getUser.account.questions }} questions</span>
					</div>
					<div class="col-sm-4 d-flex flex-column justify-content-between mb-3">
						<a class="text-info" @click.prevent="cancelSubscription">
							<loading class="mr-2" v-if="loading" />
							<span>Cancel subscription</span>
						</a>
					</div>
				</div>
				<div v-else>
					<p class="lead">
						<span>You are currently not subscribed. You have {{ getUser.account.questions }} questions left. </span>
						<router-link to="/pricing-plans" class="text-decoration-none text-info">Upgrade to one of our pricing plans </router-link>
						<span>to continue to ask more questions and much more access.</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCancelSubscription } from '@application/usecases/payments/subscription'
import { useStore } from '@application/usecases/store'
import PaymentMethodCard from '@application/components/account/single/PaymentMethodCard.vue'
import { usePaymentMethodsList } from '@application/usecases/payments/paymentMethods'
export default defineComponent({
	setup(){
		const { loading, cancelSubscription } = useCancelSubscription()
		const { loading: methodsLoading, methods, error: methodsError } = usePaymentMethodsList()
		return {
			methodsLoading, methods, methodsError,
			setAccountModalAddPaymentMethod: useStore().modals.setAccountModalAddPaymentMethod,
			setAccountModalTransactions: useStore().modals.setAccountModalTransactions,

			loading, cancelSubscription,
			getUser: useStore().auth.getUser,
			isSubscribed: useStore().auth.isSubscribed,
			convertToTitle: (string: string) => {
				const res = string.split('_')
				let plan = res[2]
				const duration = res[1]
				plan = plan[0].toUpperCase() + plan.slice(1)
				return `${plan}(${duration})`
			}
		}
	},
	components: {
		'payment-method-card': PaymentMethodCard
	}
})
</script>
