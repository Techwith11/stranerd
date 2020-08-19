// @ts-nocheck
import { firestore } from '@/config/firebase'

const state = {
	subjects: []
}

const getters = {
	getAllSubjects: (state) => state.subjects
}

const mutations = {
	setAllSubjects: (state, subjects) => state.subjects = subjects,
}

const actions = {
	async fetchAllSubjects({ commit }){
		try{
			const docs = await firestore.collection('subjects').orderBy('name').get()
			const subjects = docs.docs.map((doc) => ({ ...doc.data(), '.key': doc.id }))
			commit('setAllSubjects', subjects)
		}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching content. Try refreshing the page' }) }
	},
}

export default { state, getters, mutations, actions }
