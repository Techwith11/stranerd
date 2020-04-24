import { auth } from '@/config/firebase'

const state = {
    user: null
}

const getters = {
    getUser: state => state.user,
    isLoggedIn: state => state.user != null
}

const mutations = {
    setUser: (state, user) => state.user = user,
    makeTutor(state, tutor){
        state.user.bio.roles.isTutor = true
        state.user.tutor = tutor
    }
}

const actions = {
    setUser:({ commit }, user) => commit('setUser', user),
    makeTutor: ({ commit }, tutor) => commit('makeTutor', tutor),
    logout: async () => {
        await auth.signOut()
        let togglers = document.getElementsByClassName('navbar-toggler')
        let navbarOpen = document.getElementsByClassName('navbar-collapse collapse show')
        if(togglers.length > 0 && navbarOpen.length > 0){ togglers[0].click() }
    },
}

export default { state, getters, mutations, actions }
