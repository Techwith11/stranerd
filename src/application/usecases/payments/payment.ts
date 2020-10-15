import { computed, reactive } from '@vue/composition-api'
import { Notify } from '@/config/notifications'
import { MakePayment } from '@modules/payments'
import { useStore } from '@/usecases/store'

export const usePayment = () => {
	const state = reactive({
		loading: false
	})

	const makePayment = async (amount: number, token: string) => {
		state.loading = true
		try{
			const res = await MakePayment.call(useStore().auth.getId.value, amount, token)
			if(res) await Notify({ title: 'Payment successful', icon: 'success' })
			else await Notify({ title: 'Payment unsuccessful', icon: 'error' })
			state.loading = false
			return res
		}catch(e) { await Notify({ title: e.message, icon: 'error' }) }
		state.loading = false
	}

	return {
		loading: computed(() => state.loading),
		makePayment
	}
}
