import { firestore } from '@/config/firebase'

const helpers = {
	updateProfile: async (bio, id) => await firestore.collection('users').doc(id).set({ bio }, { merge: true })
}

let url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/stranerd/'

const state = {
	images: {
		defaultImage: url + 'users/images/user_profile.png',
		logo: url + 'assets/stranerd_logo.png',
		landing_hero: url + 'assets/landing_hero.jpg',
		success_hero: url + 'assets/success_stories.jpg',
		why_us_hero: url + 'assets/why_us_hero.jpg',
		icons: {
			registered_students: url + 'assets/icons/Registered Students.svg',
			unlimited_access: url + 'assets/icons/Unlimited Access.svg',
			learn_anywhere: url + 'assets/icons/Learn Anywhere.svg',
			helped_students: url + 'assets/icons/Helped Students.svg',
			expert_teacher: url + 'assets/icons/Expert Teacher.svg',
			rank: url + 'assets/icons/Rank.svg',
			visits: url + 'assets/icons/Visits.svg'
		}
	},
	intendedRoute: null,
	accountModalOpen: false,
	accountModalState: null
}

const getters = {
	getDefaultImage: state => state.images.defaultImage,
	getImages: state => state.images,
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