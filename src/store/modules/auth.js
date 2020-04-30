import { auth, firestore, functions } from '@/config/firebase'

const state = {
    id: "kevin11", //TODO: Remove this hardcoded id before pushing to prod
    user: {},
    listener: () => {}
}

const getters = {
    getId: state => state.id,
    getUser: state => state.user,
    getChattedWith: state => state.user.chattedWith || [],
    isLoggedIn: state => !!state.id
}

const mutations = {
    setId: (state, id) => state.id = id,
    setUser: (state, user) => state.user = user,
    setListener: (state, listener) => state.listener = listener,
    closeListener: (state) => state.listener()
}

const actions = {
    setId:({ commit }, id) => commit('setId', id),
    setUser:({ commit }, user) => commit('setUser', user),
    setListener: ({ getters, commit }) => {
        let listener = firestore.collection('users').doc(getters.getId)
            .onSnapshot(snapshot => { commit('setUser', snapshot.data())})
        commit('setListener', listener)
    },
    closeListener: ({ commit }) => commit('closeListener'),
    makeTutor: (store, tutor) => {
        let makeTutor = functions.httpsCallable('makeTutor')
        return makeTutor(tutor)
            .catch(error => error)
    },
    logout: async ({commit}) => {
        await auth.signOut()
        commit('setId',null)
        window.closeNavbar()
    },
}

export default { state, getters, mutations, actions }
