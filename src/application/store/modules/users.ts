// @ts-nocheck
import { firestore, uploadFile } from '@/config/firebase'
import { Store } from '@/store'
import { checkForUnfinishedTests } from '@/config/tests'

const state = {
	id: window.localStorage.getItem('user_id') ?? null,
	user: JSON.parse(window.localStorage.getItem('user')) ?? {},
	profileListener: () => {}
}

const getters = {
	getId: (state) => state.id,
	getUser: (state) => state.user,
	getChattedWith: (state) => state.user.chattedWith || [],
	isLoggedIn: (state) => !!(state.id && state.user.bio),
	isAdmin: (state) => state.user?.roles?.isAdmin ?? false,
	isTutor: (state) => state.user?.roles?.isTutor ?? false,
	isSubscribed: () => false,//(state) => (state.user?.account?.subscription?.id && state.user.account?.subscription?.status === 'Active') ?? false,
	questionsLeft: (state) => state.user?.account?.questions ?? 0
}

const mutations = {
	setId: (state, id) => state.id = id,
	setProfileListener: (state, listener) => {
		state.profileListener()
		state.profileListener = listener
	},
	setUser: (state, user) => state.user = user
}

const actions = {
	setId: async({ commit }, id) => {
		commit('setId', id)
		commit('setUser', {})
		await Store.dispatch('closeProfileListener')
		if(id){
			const listener = firestore
				.collection('users')
				.doc(id).onSnapshot((snapshot) => {
					if (snapshot.exists) {
						const user = snapshot.data()
						commit('setUser', user)
						window.localStorage.setItem('user', JSON.stringify(user))
					} else commit('setId', null)
				})
			await commit('setProfileListener', listener)
			await checkForUnfinishedTests(id)
			window.localStorage.setItem('user_id', id)
		}else{
			window.localStorage.removeItem('user')
			window.localStorage.removeItem('user_id')
		}

	},
	closeProfileListener: ({ commit }) => commit('setProfileListener', () => {}),
	async updateProfile({ getters }, data){
		const bio = data.bio
		const image = data.image
		if(image) bio.image = await uploadFile('users/images', image)
		return await firestore.collection('users').doc(getters.getId).set({ bio }, { merge: true })
	},
}

export default { state, getters, mutations, actions }
