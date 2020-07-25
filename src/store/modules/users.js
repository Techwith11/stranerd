import { firestore, functions } from '@/config/firebase'
import store from '@/store/index'

const state = {
	id: null,
	user: JSON.parse(window.localStorage.getItem('user')) || {},
	profileListener: () => {}
}

const getters = {
	getId: (state) => state.id,
	getUser: (state) => state.user,
	getChattedWith: (state) => state.user.chattedWith || [],
	isLoggedIn: (state) => !!state.id && !!state.user.bio,
	isAdmin: (state) => state.user && state.user.roles && state.user.roles.isAdmin,
	isTutor: (state) => state.user && state.user.roles && state.user.roles.isTutor,
	questionsLeft: (state) => state.user && state.user.account ? state.user.account.questions : 0,
	isSubscribed: (state) => state.user && state.user.account && state.user.account.subscription && state.user.account.subscription.id
}

const mutations = {
	setId: async (state, id) => {
		state.id = id
		state.profileListener()
		if(id){
			state.profileListener = firestore
				.collection('users')
				.doc(id)
				.onSnapshot(snapshot => {
					if (snapshot.exists) {
						let user = snapshot.data()
						state.user = user
						window.localStorage.setItem('user', JSON.stringify(user))
					} else {
						store.dispatch('setId', null)
					}
				})
			await store.dispatch('checkForUnfinishedTests')
			window.localStorage.setItem('user_id', id)
		}else{
			state.user = {}
			state.profileListener = () => {}
			window.localStorage.removeItem('user')
			window.localStorage.removeItem('user_id')
		}
	},
	setProfileListener: (state, listener) => {
		state.profileListener()
		state.profileListener = listener
	}
}

const actions = {
	setId: ({ commit }, id) => commit('setId', id),
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
	async updateProfile({ getters }, data){
		let bio = data.bio
		let image = data.image
		if(image){
			bio.image = await window.uploadFile('users/images', image)
		}
		return await firestore.collection('users').doc(getters.getId).set({ bio }, { merge: true })
	},
}

export default { state, getters, mutations, actions }
