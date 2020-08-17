import { computed, reactive } from '@vue/composition-api'
import { Notify } from '@/config/notifications'
import { MakePayment } from '@root/modules/payments'
import store from '@/store'

export const usePayment = () => {
	const state = reactive({
		loading: false
	})

	const makePayment = async (amount: number, token: string) => {
		state.loading = true
		try{
			console.log('payment')
			const res = await MakePayment.call(store.getters.getId, amount, token)
			return res
		}catch(e) { await Notify({ title: e.message, icon: 'error' }) }
		state.loading = false
	}

	return {
		loading: computed(() => state.loading),
		makePayment
	}
}
