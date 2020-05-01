import { auth, firestore, functions } from '@/config/firebase'

let id = window.location.hostname === 'localhost' ? 'kevin11' : ''

const state = {
    id,
    user: {},
    profileListener: () => {}
}

const getters = {
    getId: state => state.id,
    getUser: state => state.user,
    getChattedWith: state => state.user.chattedWith || [],
    isLoggedIn: state => !!state.id,
    isAdmin: state => state.user.roles.isAdmin,
    isTutor: state => state.user.roles.isTutor
}

const mutations = {
    setId: (state, id) => state.id = id,
    setUser: (state, user) => state.user = user,
    setProfileListener: (state, listener) => {
        state.profileListener()
        state.profileListener = listener
    }
}

const actions = {
    setId:({ commit }, id) => commit('setId', id),
    setUser:({ commit }, user) => commit('setUser', user),
    setProfileListener: ({ getters, commit }) => {
        let listener = getters.getId ? firestore.collection('users').doc(getters.getId)
            .onSnapshot(snapshot => commit('setUser', snapshot.data())) : () => {}
        commit('setProfileListener', listener)
    },
    closeProfileListener: ({ commit }) => commit('setListener', () => {}),
    makeTutor: (store, tutor) => {
        let makeTutor = functions.httpsCallable('makeTutor')
        return makeTutor(tutor)
            .catch(error => error)
    },
    logout: async ({commit}) => {
        await auth.signOut()
        commit('setId','')
        window.closeNavbar()
    },
}

export default { state, getters, mutations, actions }
