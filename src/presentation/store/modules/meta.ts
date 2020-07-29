// @ts-nocheck
import { firestore, functions } from '@/config/firebase'

let url = `https://firebasestorage.googleapis.com/v0/b/stranerd-13084.appspot.com/o/${encodeURIComponent('users/images/user_profile.png')}?alt=media`

const state = {
	defaultImage: process.env.NODE_ENV === 'production' ? url : '/img/user_profile.png',
	intendedRoute: null,
	createPost: null,
	editMeta: null,
	scrollCache: {},
	plans: []
}

const getters = {
	getDefaultImage: state => state.defaultImage,
	getIntendedRoute: state => state.intendedRoute,
	getCreatePost: state => state.createPost,
	getEditMeta: state => state.editMeta,
	getScrollCache: state => state.scrollCache,
	getPlans: state => state.plans
}

const mutations = {
	setIntendedRoute: (state, route) => state.intendedRoute = route,
	setCreatePost: (state, post) => state.createPost = post,
	setEditMeta: (state, meta) => state.editMeta = { ...meta },
	setScrollCache: (state, { page, position }) => state.scrollCache[page] = position,
	setPlans: (state, plans) => state.plans = plans,
}

const actions = {
	setIntendedRoute: ({ commit }, route) => commit('setIntendedRoute', route),
	clearIntendedRoute: ({ commit }) => commit('setIntendedRoute', null),
	setCreatePost: ({ commit }, post) => commit('setCreatePost', post),
	clearCreatePost: ({ commit }) => commit('setCreatePost', null),
	setEditMeta: ({ commit }, meta) => commit('setEditMeta', meta),
	clearEditMeta: ({ commit }) => commit('setEditMeta', null),
	setScrollCache: ({ commit }, meta) => commit('setScrollCache', meta),
	fetchAllPlans: async ({ commit }) => {
		try{
			let docs = await firestore.collection('subscriptions').get()
			let plans = docs.docs.map(doc => ({ '.key': doc.id, ...doc.data() }))
			plans.sort((a, b) => a.questions - b.questions)
			commit('setPlans', plans)
		}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching content. Try refreshing the page' }) }
	},
	async subscribeToMail(store, email){
		return await functions.httpsCallable('subscribeToMailingList')({ email })
	}
}

export default { state, getters, mutations, actions }
