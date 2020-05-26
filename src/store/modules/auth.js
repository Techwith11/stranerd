import { auth, firestore, functions } from '@/config/firebase'
import router from '@/router/index'

const state = {
	id: window.localStorage.getItem('user_id'),
	user: {},
	profileListener: () => {}
}

const getters = {
	getId: (state) => state.id,
	getUser: (state) => state.user,
	getChattedWith: (state) => state.user.chattedWith || [],
	isLoggedIn: (state) => !!state.id,
	isAdmin: (state) => state.user && state.user.roles && state.user.roles.isAdmin,
	isTutor: (state) => state.user && state.user.roles && state.user.roles.isTutor,
	questionsLeft: (state) => state.user && state.user.account ? state.user.account.questions : 0,
	isSubscribed: (state) => state.user && state.user.account && state.user.account.subscription && state.user.account.subscription.id
}

const mutations = {
	setId: (state, id) => {
		state.id = id
		id ? window.localStorage.setItem('user_id', id) : window.localStorage.removeItem('user_id')
	},
	setUser: (state, user) => (state.user = user),
	setProfileListener: (state, listener) => {
		state.profileListener()
		state.profileListener = listener
	}
}

const actions = {
	setId: ({ commit }, id) => commit('setId', id),
	setUser: ({ commit }, user) => commit('setUser', user),
	setProfileListener: ({ getters, commit }) => {
		let listener = getters.getId
			? firestore
				.collection('users')
				.doc(getters.getId)
				.onSnapshot((snapshot) => (snapshot.exists ? commit('setUser', snapshot.data()) : commit('setId', null)))
			: () => {}
		commit('setProfileListener', listener)
	},
	closeProfileListener: ({ commit }) => commit('setProfileListener', () => {}),
	makeTutor: (store, tutor) => {
		let makeTutor = functions.httpsCallable('makeTutor')
		return makeTutor(tutor)
			.then((res) => res.data)
			.catch((error) => new window.Toast({ icon: 'error', title: error.message }))
	},
	makeAdmin: (store, data) => {
		let makeAdmin = functions.httpsCallable('makeAdmin')
		return makeAdmin(data)
			.then((res) => res.data)
			.catch((error) => new window.Toast({ icon: 'error', title: error.message }))
	},
	removeAdmin: (store, data) => {
		let removeAdmin = functions.httpsCallable('removeAdmin')
		return removeAdmin(data)
			.then((res) => res.data)
			.catch((error) => new window.Toast({ icon: 'error', title: error.message }))
	},
	logout: async ({ commit }) => {
		await auth.signOut()
		commit('setId', null)
		await router.push('/').catch((error) => error)
		window.closeNavbar()
		window.closeAccountDropdown()
		window.closeAdminDropdown()
	}
}

export default { state, getters, mutations, actions }
