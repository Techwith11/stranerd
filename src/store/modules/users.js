import { firestore } from '@/config/firebase'

const helpers = {
	updateProfile: async (bio, id) => await firestore.collection('users').doc(id).set({ bio }, { merge: true })
}

const state = {
	defaultImage: 'http://localhost:3000/stranerd/users/images/Cassette.svg',
	logo: 'http://localhost:3000/stranerd/assets/stranerd_logo.png',
	intendedRoute: null,
	accountModalOpen: false,
	accountModalState: null
}

const getters = {
	getDefaultImage: state => state.defaultImage,
	getLogo: state => state.logo,
	getIntendedRoute: (state) => state.intendedRoute,
	isAccountModalOpen: state => state.accountModalOpen,
	isAccountModalOverview: state => state.accountModalState === 'profile-overview',
	isAccountModalEditProfile: state => state.accountModalState === 'edit-profile',
	isAccountModalUpdatePassword: state => state.accountModalState === 'update-password',
	isAccountModalAddPaymentMethod: state => state.accountModalState === 'add-payment-method',
	isAccountModalSelectSubscription: state => state.accountModalState === 'select-subscription'
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
	setAccountModalStateOverview: ({ commit }) => commit('setAccountModalState', 'profile-overview'),
	setAccountModalStateEditProfile: ({ commit }) => commit('setAccountModalState', 'edit-profile'),
	setAccountModalStateUpdatePassword: ({ commit }) => commit('setAccountModalState', 'update-password'),
	setAccountModalStateAddPaymentMethod: ({ commit }) => commit('setAccountModalState', 'add-payment-method'),
	setAccountModalStateSelectSubscription: ({ commit }) => commit('setAccountModalState', 'select-subscription'),
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