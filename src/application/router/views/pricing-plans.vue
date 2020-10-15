<template>
	<Default>
		<banner />
		<helper-spinner v-if="plansLoading" />
		<div class="container py-5" v-else>
			<div v-if="page === 1">
				<div class="d-flex justify-content-center align-items-center mb-5">
					<span class="mr-2">Monthly</span>
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="toggle" v-model="annual">
						<label for="toggle" class="custom-control-label">Annually</label>
					</div>
				</div>
				<div class="my-3 d-flex flex-column flex-lg-row justify-content-center align-items-center">
					<div class="cards p-3 p-lg-4 mb-3 shadow-sm rounded-lg" v-for="plan in plans" :key="plan.id" @click="setId(plan)"
						:class="{'selected': (id === plan.yearlyId && annual) || (!annual && id === plan.monthlyId) }">
						<h5 class="text-capitalize text-center font-weight-500 mb-4 plan-title">{{ plan.title }}</h5>
						<div class="d-flex justify-content-center align-items-start">
							<h1 class="display-4 font-weight-500 mb-1">&dollar;{{ annual ? plan.yearlyPrice : plan.monthlyPrice }}</h1>
							<p v-if="annual" class="small text-success">save 16%</p>
						</div>
						<p class="plan-range text-center">per {{ annual ? 'year' : 'month' }}</p>
						<p class="mx-auto w-75">{{ plan.description }}</p>
						<hr class="my-4 w-75 mx-auto">
						<div class="small w-75 mx-auto">
							<div class="p-2"><i class="fas fa-circle mr-2"></i>{{ plan.questions }} questions per month</div>
							<div class="p-2"><i class="fas fa-circle mr-2"></i>Unlimited access to resources</div>
							<div class="p-2"><i class="fas fa-circle mr-2"></i>Unlimited tutors</div>
							<div class="p-2"><i class="fas fa-circle mr-2"></i>Discounted prices on sessions</div>
							<div class="p-2"><i class="fas fa-circle mr-2"></i>24/7 support</div>
						</div>
						<div class="d-flex justify-content-center mt-3" v-if="(annual && plan.yearlyId === id) || (!annual && plan.monthlyId === id)">
							<p v-if="(annual && plan.yearlyId === planId) || (!annual && plan.monthlyId === planId)" class="text-danger">Currently on this plan</p>
							<button class="btn btn-success rounded-pill shadow-sm" v-else @click="continueToPay">Continue</button>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<a class="small text-muted" @click.prevent="goBack">
					i.fas.fa-arrow-left
				</a>
				<h5 class="mb-5 text-center">Select payment method to use to pay for subscription</h5>
				<select-payment-method :onMethodSelected="setToken" :loading="loading" />
				<div class="d-flex justify-content-end">
					<button class="btn btn-success" :class="{'opacity-25': !token}" :disabled="!token || loading" @click="createSubscription">
						<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
						<span>Subscribe</span>
					</button>
				</div>
			</div>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, computed } from '@vue/composition-api'
import SelectPaymentMethod from '@application/components/helpers/payments/SelectPaymentMethod.vue'
import { useCreateSubscription, useSubscriptionPlansList } from '@application/usecases/payments/subscription'
import { useStore } from '@application/usecases/store'
import { PlanEntity } from '@modules/payments/domain/entities/plan'
export default defineComponent({
	setup(){
		const { loading: plansLoading, plans } = useSubscriptionPlansList()
		const { loading, subscribe } = useCreateSubscription()
		const isLoggedIn = useStore().auth.isLoggedIn

		const state = reactive({
			annual: false, page: 1,
			id: null as string | null,
			token: null as string | null
		})

		const setToken = (token: string) => state.token = token
		const setId = (plan: PlanEntity) => {
		  state.id = state.annual ? plan.yearlyId : plan.monthlyId
			if(!isLoggedIn.value) useStore().modals.setAuthModalLogin()
		}
		const createSubscription = () => state.id && state.token ? subscribe(state.id, state.token) : null

		const planId = computed(() => useStore().auth.getUser.value?.account?.subscription?.planId ?? null)
		watch(() => planId.value, () => state.id = planId.value)
		const continueToPay = () => {
			if(state.id && state.id !== planId.value){
				state.page = 2
				document.getElementsByTagName('body')[0].scrollIntoView()
			}
		}
		const goBack = () => {
			state.page = 1
			document.getElementsByTagName('body')[0].scrollIntoView()
		}

		return {
			plansLoading, plans, loading, createSubscription,
			isLoggedIn, isSubscribed: useStore().auth.isSubscribed,

			planId, setId, setToken, continueToPay, goBack,
			annual: computed({ get: () => state.annual, set: (val: boolean) => { state.annual = val; state.id = null } }),
			page: computed(() => state.page),
			token: computed(() => state.token),
			id: computed(() => state.id),
		}
	},
	components: {
		'select-payment-method': SelectPaymentMethod
	}
})
</script>

<style lang="scss" scoped>
  .cards{
    max-width: 500px;
  }
  .selected{
    background: $primary-light;
    h5.plan-title, p.plan-range, i { color: $accent; }
    hr { background: $accent; }
  }
</style>
