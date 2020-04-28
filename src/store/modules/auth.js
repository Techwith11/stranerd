import { auth, firestore, functions } from '@/config/firebase'

const state = {
    id: "frank",
    user: {}
}

const getters = {
    getUser: state => state.user,
    getId: state => state.id,
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
        let collapse = document.getElementsByClassName('navbar-collapse')[0]
        collapse.classList.toggle('collapse')
        collapse.classList.toggle('in')
    },
}

export default { state, getters, mutations, actions }
