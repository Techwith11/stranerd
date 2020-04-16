const state = {
    modal: 'overview',
    open: false
}

const getters = {
    isModalOpen: state => state.open,
    isModalOverview: state => state.modal === 'overview',
    isModalLogin: state => state.modal === 'login',
    isModalForgotPassword: state => state.modal === 'forgot-password',
    isModalRegisterStudent: state => state.modal === 'register-student',
    isModalRegisterTutor: state => state.modal === 'register-tutor',
}

const mutations = {
    setModal(state, mode){
        state.modal = mode
        state.open = true
    },
    setOpen(state, mode){
        let togglers = document.getElementsByClassName('navbar-toggler')
        let navbarOpen = document.getElementsByClassName('navbar-collapse collapse show')
        if(togglers.length > 0 && navbarOpen.length > 0) togglers[0].click()
        state.open = mode
        state.modal = 'overview'
    }
}

const actions = {
    setModalOverview: ({ commit }) => commit('setModal', 'overview'),
    setModalLogin: ({ commit }) => commit('setModal', 'login'),
    setModalForgotPassword: ({ commit }) => commit('setModal', 'forgot-password'),
    setModalRegisterStudent: ({ commit }) => commit('setModal', 'register-student'),
    setModalRegisterTutor: ({ commit }) => commit('setModal', 'register-tutor'),
    closeModal: ({ commit }) => commit('setOpen', false),
    openModal: ({ commit }) => commit('setOpen', true),
}

export default { state, getters, mutations, actions }