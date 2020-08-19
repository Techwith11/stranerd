// @ts-nocheck
import {functions} from '@/config/firebase'

const helpers = {
	removePaymentMethod: async (data) => (await functions.httpsCallable('removePaymentMethod')(data)).data,
	cancelSubscription: async (data) => (await functions.httpsCallable('cancelSubscription')(data)).data,
}


const actions = {
	async removePaymentMethod({ getters }, id){
		const result = await helpers.removePaymentMethod({
			user: getters.getId,
			id
		})
		if(result === false){
			throw new Error('Error removing card')
		}
		return result
	},
	async cancelSubscription({ getters }){
		const result = await helpers.cancelSubscription({ id: getters.getId })
		if(result === false){
			throw new Error('Error cancelling subscription')
		}
		return result
	}
}

export default { actions }
