const state = {
    modal: null,
    createModal: null
}

const getters = {
    isAuthModalOpen: state => !!state.modal,
    isAuthModalOverview: state => state.modal === 'overview',
    isAuthModalLogin: state => state.modal === 'login',
    isAuthModalForgotPassword: state => state.modal === 'forgot-password',
    isAuthModalRegisterStudent: state => state.modal === 'register-student',
    isAuthModalRegisterTutor: state => state.modal === 'register-tutor',

    isCreateModalOpen: state => !!state.createModal,
    isCreateModalOverview: state => state.createModal === 'create-overview',
    isCreateModalCourse: state => state.createModal === 'create-course',
    isCreateModalQuestion: state => state.createModal === 'create-question',
    isCreateModalNote: state => state.createModal === 'create-note',
    isCreateModalBlog: state => state.createModal === 'create-blog-post',
}

const mutations = {
    setAuthModal: (state, mode) => state.modal = mode,
    setCreateModal: (state,mode) => state.createModal = mode
}

const actions = {
    setAuthModalOverview: ({ commit }) => commit('setAuthModal', 'overview'),
    setAuthModalLogin: ({ commit }) => commit('setAuthModal', 'login'),
    setAuthModalForgotPassword: ({ commit }) => commit('setAuthModal', 'forgot-password'),
    setAuthModalRegisterStudent: ({ commit }) => commit('setAuthModal', 'register-student'),
    setAuthModalRegisterTutor: ({ commit }) => commit('setAuthModal', 'register-tutor'),
    closeAuthModal: ({ commit }) => commit('setAuthModal', null),

    closeCreateModal: ({ commit }) => commit('setCreateModal', null),
    setCreateModalOverview: ({ commit }) => commit('setCreateModal', 'create-overview'),
    setCreateModalCourse: ({ commit }) => commit('setCreateModal', 'create-course'),
    setCreateModalQuestion: ({ commit }) => commit('setCreateModal', 'create-question'),
    setCreateModalNote: ({ commit }) => commit('setCreateModal', 'create-note'),
    setCreateModalBlog: ({ commit }) => commit('setCreateModal', 'create-blog-post'),
}

export default { state, getters, mutations, actions }