// @ts-nocheck
import { firestore, uploadFile } from '@/config/firebase'

const state = {
	subjects: []
}

const getters = {
	getAllSubjects: state => state.subjects
}

const mutations = {
	setAllSubjects: (state, subjects) => state.subjects = subjects,
	addSubject: (state, subject) => state.subjects.push(subject),
	deleteSubject: (state, id) => state.subjects = state.subjects.filter(s => s['.key'] !== id),
	editSubject(state, subject){
		let index = state.subjects.findIndex(s => s['.key'] === subject['.key'])
		state.subjects[index].name = subject.name
		state.subjects[index].modules = subject.modules.map(m => m)
	},
}

const actions = {
	async fetchAllSubjects({ commit }){
		try{
			let docs = await firestore.collection('subjects').orderBy('name').get()
			let subjects = docs.docs.map(doc => ({ ...doc.data(), '.key': doc.id }))
			commit('setAllSubjects', subjects)
		}catch(error){ new window.Toast({ icon: 'error', title: 'Error fetching content. Try refreshing the page' }) }
	},
	async createSubject({ commit }, subject){
		let doc = await firestore.collection('subjects').add(subject)
		commit('addSubject',{ ...subject, '.key': doc.id })
	},
	async editSubject({ commit }, subject){
		await firestore.collection('subjects').doc(subject['.key']).set(subject)
		commit('editSubject',{ ...subject })
	},
	async deleteSubject({ commit }, id){
		await firestore.collection('subjects').doc(id).delete()
		commit('deleteSubject',id)
	},
	async createModule({ commit }, { subject, module, image }){
		module.image = await uploadFile('subjects', image)
		subject.modules.push(module)
		await firestore.collection('subjects').doc(subject['.key']).set(subject)
		commit('editSubject', { ...subject })
	},
	async editModule({ commit }, { subject, module, updated, image }){
		if(image.size){
			updated.image = await uploadFile('subjects', image)
		}
		let index = subject.modules.findIndex(m => m.name === module.name)
		subject.modules[index] = updated
		await firestore.collection('subjects').doc(subject['.key']).set(subject)
		commit('editSubject', { ...subject })
	},
	async deleteModule({ commit }, { subject, module }){
		subject.modules = subject.modules.filter(m => m.name !== module.name)
		await firestore.collection('subjects').doc(subject['.key']).set(subject)
		commit('editSubject', { ...subject })
	}
}

export default { state, getters, mutations, actions }
