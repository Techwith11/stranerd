// @ts-nocheck
import { firestore, functions } from '@/config/firebase'

const url = `https://firebasestorage.googleapis.com/v0/b/stranerd-13084.appspot.com/o/${encodeURIComponent('users/images/user_profile.png')}?alt=media`

const state = {
	defaultImage: process.env.NODE_ENV === 'production' ? url : '/img/user_profile.png',
	plans: []
}

const getters = {
	getDefaultImage: (state) => state.defaultImage,
	getPlans: (state) => state.plans
}

const mutations = {
	setPlans: (state, plans) => state.plans = plans,
}

const actions = {
	fetchAllPlans: async ({ commit }) => {
		try{
			const docs = await firestore.collection('subscriptions').get()
			const plans = docs.docs.map((doc) => ({ '.key': doc.id, ...doc.data() }))
			plans.sort((a, b) => a.questions - b.questions)
			commit('setPlans', plans)
		}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching content. Try refreshing the page' }) }
	},
	async subscribeToMail(store, email){
		return await functions.httpsCallable('subscribeToMailingList')({ email })
	}
}

export default { state, getters, mutations, actions }
