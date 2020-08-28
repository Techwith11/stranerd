import { computed, reactive } from '@vue/composition-api'
import { GetMailingListFactory, SubscribeToMailingList } from '@root/modules/users'
import { Notify } from '@/config/notifications'

export const useMailingList = () => {
	const state = reactive({
		loading: false,
		factory: GetMailingListFactory.call()
	})

	const subscribeToMailingList = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			try{
				await SubscribeToMailingList.call(state.factory)
				state.factory.reset()
				state.loading = false
				await Notify({ icon: 'success', title: 'Subscribed successfully' })
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	return {
		loading: computed(() => state.loading),
		factory: computed(() => state.factory),
		subscribeToMailingList
	}
}
