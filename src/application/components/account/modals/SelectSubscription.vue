<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Select subscription</h4>
			<a @click.prevent="closeAccountModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div>
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
					<div class="row my-3">
						<div class="col-lg-4 mb-5" v-for="(plan,index) in plans" :key="plan.id">
							<div class="text-center alert mb-3 shadow" :class="`alert-${colors[index]}`">
								<h5 class="text-capitalize mb-4">{{ plan.title }}</h5>
								<p v-if="annual">save 16%</p>
								<h1>&dollar;{{ annual ? plan.yearlyPrice : plan.monthlyPrice }}</h1>
								<p>per {{ annual ? 'year' : 'month' }}</p>
							</div>
							<div class="alert shadow" :class="`alert-${colors[index]}`">
								<p class="text-center">{{ plan.description }}</p>
								<hr class="my-4">
								<ul class="small list-group">
									<li class="list-group-item">{{ plan.questions }} questions per month</li>
									<li class="list-group-item">Unlimited access to resources</li>
									<li class="list-group-item">Unlimited tutors</li>
									<li class="list-group-item">Discounted prices on sessions</li>
									<li class="list-group-item">24/7 support</li>
								</ul>
							</div>
							<div class="d-flex justify-content-center" v-if="annual">
								<p v-if="isLoggedIn && plan.yearlyId === planId">Currently on this plan</p>
								<button class="btn btn-success shadow" @click="setId(plan.yearlyId)" v-else>Select</button>
							</div>
							<div class="d-flex justify-content-center" v-else>
								<p v-if="isLoggedIn && plan.monthlyId === planId">Currently on this plan</p>
								<button class="btn btn-success shadow" @click="setId(plan.monthlyId)" v-else>Select</button>
							</div>
						</div>
					</div>
				</div>
				<div v-else>
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
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from '@vue/composition-api'
import SelectPaymentMethod from '@/components/helpers/payments/SelectPaymentMethod.vue'
import { useCreateSubscription, useSubscriptionPlansList } from '@/usecases/payments/subscription'
import { useStore } from '@root/application/usecases/store'
export default defineComponent({
	setup(){
		const { loading: plansLoading, plans } = useSubscriptionPlansList()
		const { loading, subscribe } = useCreateSubscription()
		const isLoggedIn = useStore().auth.isLoggedIn

		const state = reactive({
			annual: false, page: 1,
			id: null as string | null, token: null as string | null
		})

		const setToken = (token: string) => state.token = token
		const setId = (id: string) => {
			if(isLoggedIn.value){
				state.id = id
				state.page = 2
				document.getElementsByTagName('body')[0].scrollIntoView()
			}else useStore().modals.setAuthModalLogin()
		}
		const createSubscription = () => state.id && state.token ? subscribe(state.id, state.token) : null

		const planId = computed(() => useStore().auth.getUser.value?.account?.subscription?.planId ?? null)
		watch(() => planId.value, () => state.id = planId.value)

		return {
			plansLoading, plans, loading, createSubscription,
			closeAccountModal: useStore().modals.closeAccountModal,
			colors: ['danger','info','success'],
			isLoggedIn, isSubscribed: useStore().auth.isSubscribed,

			planId, setId, setToken,
			annual: computed({ get: () => state.annual, set: (val: boolean) => state.annual = val }),
			page: computed(() => state.page),
			token: computed(() => state.token),
		}
	},
	components: {
		'select-payment-method': SelectPaymentMethod
	}
})
</script>

<style lang="scss" scoped>
	.pointer{
		cursor: pointer !important;
		* {
			cursor: pointer !important;
		}
	}
</style>
