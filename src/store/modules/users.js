import { firestore } from '@/config/firebase'

const helpers = {
	updateProfile: async (bio, id) => await firestore.collection('users').doc(id).set({ bio }, { merge: true })
}

let url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/stranerd/'

const state = {
	images: {
		defaultImage: url + encodeURIComponent('users/images/user_profile.png') + '?alt=media',
		logo: url + encodeURIComponent('assets/stranerd_logo.png') + '?alt=media',
		landing_hero: url + encodeURIComponent('assets/landing_hero.jpg') + '?alt=media',
		success_hero: url + encodeURIComponent('assets/success_stories.jpg') + '?alt=media',
		why_us_hero: url + encodeURIComponent('assets/why_us_hero.jpg') + '?alt=media',
		icons: {
			registered_students: url + encodeURIComponent('assets/icons/Registered Students.svg') + '?alt=media',
			unlimited_access: url + encodeURIComponent('assets/icons/Unlimited Access.svg') + '?alt=media',
			learn_anywhere: url + encodeURIComponent('assets/icons/Learn Anywhere.svg') + '?alt=media',
			helped_students: url + encodeURIComponent('assets/icons/Helped Students.svg') + '?alt=media',
			expert_teacher: url + encodeURIComponent('assets/icons/Expert Teacher.svg') + '?alt=media',
			rank: url + encodeURIComponent('assets/icons/Rank.svg') + '?alt=media',
			visits: url + encodeURIComponent('assets/icons/Visits.svg') + '?alt=media'
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