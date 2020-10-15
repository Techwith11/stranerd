import { computed, reactive } from '@vue/composition-api'
import { PlanEntity } from '@modules/payments/domain/entities/plan'
import { CancelSubscription, GetSubscriptionPlans, SubscribeToPlan } from '@modules/payments'
import { useStore } from '@application/usecases/store'
import { Alert, Notify } from '@application/config/notifications'
import router from '@application/router'

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

export const useCancelSubscription = () => {
	const state = reactive({ loading: false })
	const cancelSubscription = async () => {
		if(!state.loading){
			const result = await Alert({
				title: 'Cancel Subscription',
				text: 'Are you sure you want to cancel your subscription',
				icon: 'info',
				confirmButtonText: 'Yes',
				cancelButtonText: 'No'
			})
			if (result.value) {
				state.loading = true
				try{
					const res = await CancelSubscription.call(useStore().auth.getId.value)
					if(res){
						await useStore().modals.closeAccountModal()
						await Notify({ icon: 'success', title: 'Subscription cancelled successfully' })
					} else await Notify({ icon: 'error', title: 'Error cancelling subscription' })
				}catch(error){ await Notify({ icon: 'error', title: error.message }) }
				state.loading = false
			}
		}
	}

	return {
		loading: computed(() => state.loading),
		cancelSubscription
	}
}
