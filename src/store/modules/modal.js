const state = {
    modal: 'overview',
    open: false,
    createOpen: false,
    createModal: 'create-overview'
}

const getters = {
    isModalOpen: state => state.open,
    isModalOverview: state => state.modal === 'overview',
    isModalLogin: state => state.modal === 'login',
    isModalForgotPassword: state => state.modal === 'forgot-password',
    isModalRegisterStudent: state => state.modal === 'register-student',
    isModalRegisterTutor: state => state.modal === 'register-tutor',
    isCreateModalOpen: state => state.createOpen,
    isCreateModalOverview: state => state.createModal === 'create-overview',
    isCreateModalCourse: state => state.createModal === 'create-course',
    isCreateModalQuestion: state => state.createModal === 'create-question',
}

const mutations = {
    setModal(state, mode){
        state.modal = mode
        state.open = true
    },
    setOpen(state, mode){
        window.closeNavbar()
        state.open = mode
        state.modal = 'overview'
    },
    setCreateOpen(state, mode){
        state.createOpen = mode
        state.createModal = 'create-overview'
    },
    setCreateModal(state,mode){
        state.createModal = mode
        state.createOpen = true
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
    closeCreateModal: ({ commit }) => commit('setCreateOpen', false),
    openCreateModal: ({ commit }) => commit('setCreateOpen', true),
    setCreateModalOverview: ({ commit }) => commit('setCreateModal', 'create-overview'),
    setCreateModalCourse: ({ commit }) => commit('setCreateModal', 'create-course'),
    setCreateModalQuestion: ({ commit }) => commit('setCreateModal', 'create-question'),
}

export default { state, getters, mutations, actions }