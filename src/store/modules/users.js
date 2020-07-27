import { firestore, uploadFile } from '@/config/firebase'
import store from '@/store/index'
import { checkForUnfinishedTests } from '@/config/tests'

const state = {
	id: null,
	user: JSON.parse(window.localStorage.getItem('user')) || {},
	profileListener: () => {}
}

const getters = {
	getId: (state) => state.id,
	getUser: (state) => state.user,
	getChattedWith: (state) => state.user.chattedWith || [],
	isLoggedIn: (state) => !!(state.id && state.user.bio),
	isAdmin: (state) => state.user?.roles?.isAdmin ?? false,
	isTutor: (state) => state.user?.roles?.isTutor ?? false,
	isSubscribed: (state) => (state.user?.account?.subscription?.id && state.user.account?.subscription?.status === 'Active') ?? false,
	questionsLeft: (state) => state.user?.account?.questions ?? 0
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
			await checkForUnfinishedTests(store.getters.getId)
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
	async updateProfile({ getters }, data){
		let bio = data.bio
		let image = data.image
		if(image){
			bio.image = await uploadFile('users/images', image)
		}
		return await firestore.collection('users').doc(getters.getId).set({ bio }, { merge: true })
	},
}

export default { state, getters, mutations, actions }
