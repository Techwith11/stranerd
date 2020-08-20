// @ts-nocheck
import { firestore } from '@/config/firebase'

const helpers = {
	addMoreQuestions: async (data) => await firestore.collection('users').doc(data.id).update('account.questions', data.quantity)
}

const actions = {
	async addMoreQuestions({ getters }, quantity){
		return await helpers.addMoreQuestions({ id: getters.getId, quantity })
	}
}

export default { actions }
