// @ts-nocheck
import {functions} from '@/config/firebase'

const helpers = {
	cancelSubscription: async (data) => (await functions.httpsCallable('cancelSubscription')(data)).data,
}


const actions = {
	async cancelSubscription({ getters }){
		const result = await helpers.cancelSubscription({ id: getters.getId })
		if(result === false){
			throw new Error('Error cancelling subscription')
		}
		return result
	}
}

export default { actions }
