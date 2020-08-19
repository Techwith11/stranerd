import { computed, reactive } from '@vue/composition-api'
import { PlanEntity } from '@root/modules/payments/domain/entities/plan'
import { GetSubscriptionPlans, SubscribeToPlan } from '@root/modules/payments'
import { useStore } from '@/usecases/store'
import { Notify } from '@/config/notifications'
import router from '@/router'

const globalState = reactive({
	plans: [] as PlanEntity[],
	fetched: false,
	loading: false,
	error: ''
})

const fetchPaymentPlans = async () => {
	globalState.loading = true
	globalState.plans = await GetSubscriptionPlans.call()
	globalState.loading = false
}

export const useSubscriptionPlansList = () => {
	if(!globalState.fetched) fetchPaymentPlans().then(() => globalState.fetched = true).catch((e) => globalState.error = e.message)
	return {
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		plans: computed(() => globalState.plans),
		fetchPaymentPlans
	}
}

export const useCreateSubscription = () => {
	const state = reactive({
		loading: false
	})
	const subscribe = async (planId: string, token: string) => {
		state.loading = true
		try{
			const res = await SubscribeToPlan.call(useStore().auth.getId.value, planId, token)
			if(res) {
				await Notify({ title: 'Subscription created successfully', icon: 'error' })
				await router.push('/')
			}
			else await Notify({ title: 'Error creating subscription', icon: 'error' })
		}catch(e){ await Notify({ title: e.message, icon: 'error' })}
		state.loading = false
	}
	return {
		loading: computed(() => state.loading),
		subscribe
	}
}
