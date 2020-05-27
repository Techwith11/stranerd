import { firestore } from '@/config/firebase'

const helpers = {
	updateProfile: async (bio, id) => await firestore.collection('users').doc(id).set({ bio }, { merge: true })
}

const state = {
	defaultImage: 'http://localhost:3000/stranerd/users/images/Cassette.svg',
	intendedRoute: null,
	accountModalOpen: false,
	accountModalState: null
}

const getters = {
	getDefaultImage: state => state.defaultImage,
	getIntendedRoute: (state) => state.intendedRoute,
	isAccountModalOpen: state => state.accountModalOpen,
	isAccountModalEditProfile: state => state.accountModalState === 'edit-profile',
	isAccountModalUpdatePassword: state => state.accountModalState === 'update-password',
}

const mutations = {
	setIntendedRoute: (state, route) => (state.intendedRoute = route),
	setAccountModalState: (state, mode) => {
		state.accountModalState = mode
		state.accountModalOpen = !!mode
	}
}


const actions = {
	setIntendedRoute: ({ commit }, route) => commit('setIntendedRoute', route),
	clearIntendedRoute: ({ commit }) => commit('setIntendedRoute', null),
	setAccountModalStateEditProfile: ({ commit }) => commit('setAccountModalState', 'edit-profile'),
	setAccountModalStateUpdatePassword: ({ commit }) => commit('setAccountModalState', 'update-password'),
	closeAccountModal: ({ commit }) => commit('setAccountModalState', null),
	async updateProfile({ getters }, data){
		let bio = data.bio
		let image = data.image
		if(image){
			bio.image = await window.uploadFile('users/images', image)
		}
		return await helpers.updateProfile(bio, getters.getId)
	}
}

export default { state, getters, mutations, actions }