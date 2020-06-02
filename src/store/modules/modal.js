const state = {
    modal: null,
    createModal: null,
    accountModal: null,
    postModal: null
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

    isAccountModalOpen: state => !!state.accountModal,
    isAccountModalOverview: state => state.accountModal === 'profile-overview',
    isAccountModalEditProfile: state => state.accountModal === 'edit-profile',
    isAccountModalUpdatePassword: state => state.accountModal === 'update-password',
    isAccountModalAddPaymentMethod: state => state.accountModal === 'add-payment-method',
    isAccountModalSelectSubscription: state => state.accountModal === 'select-subscription',

    isPostModalOpen: state => !!state.postModal,
    isPostModalNotify: state => state.postModal === 'post-notify',
    isPostModalCreate: state => state.postModal === 'post-create',
    isPostModalBuyMore: state => state.postModal === 'buy-more',
}

const mutations = {
    setAuthModal: (state, mode) => state.modal = mode,
    setCreateModal: (state,mode) => state.createModal = mode,
    setAccountModal: (state, mode) => state.accountModal = mode,
    setPostModal: (state, mode) => state.postModal = mode
}

const actions = {
    setAuthModalOverview: ({ commit }) => commit('setAuthModal', 'overview'),
    setAuthModalLogin: ({ commit }) => commit('setAuthModal', 'login'),
    setAuthModalForgotPassword: ({ commit }) => commit('setAuthModal', 'forgot-password'),
    setAuthModalRegisterStudent: ({ commit }) => commit('setAuthModal', 'register-student'),
    setAuthModalRegisterTutor: ({ commit }) => commit('setAuthModal', 'register-tutor'),
    closeAuthModal: ({ commit }) => commit('setAuthModal', null),

    setCreateModalOverview: ({ commit }) => commit('setCreateModal', 'create-overview'),
    setCreateModalCourse: ({ commit }) => commit('setCreateModal', 'create-course'),
    setCreateModalQuestion: ({ commit }) => commit('setCreateModal', 'create-question'),
    setCreateModalNote: ({ commit }) => commit('setCreateModal', 'create-note'),
    setCreateModalBlog: ({ commit }) => commit('setCreateModal', 'create-blog-post'),
    closeCreateModal: ({ commit }) => commit('setCreateModal', null),

    setAccountModalOverview: ({ commit }) => commit('setAccountModal', 'profile-overview'),
    setAccountModalEditProfile: ({ commit }) => commit('setAccountModal', 'edit-profile'),
    setAccountModalUpdatePassword: ({ commit }) => commit('setAccountModal', 'update-password'),
    setAccountModalAddPaymentMethod: ({ commit }) => commit('setAccountModal', 'add-payment-method'),
    setAccountModalSelectSubscription: ({ commit }) => commit('setAccountModal', 'select-subscription'),
    closeAccountModal: ({ commit }) => commit('setAccountModal', null),

    setPostModalCreate: ({ commit }) => commit('setPostModal','post-create'),
    setPostModalNotify: ({ commit }) => commit('setPostModal','post-notify'),
    setPostModalBuyMore: ({ commit }) => commit('setPostModal','buy-more'),
    closePostModal: ({ commit }) =>  commit('setPostModal', null)
}

export default { state, getters, mutations, actions }