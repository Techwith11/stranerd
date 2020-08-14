// @ts-nocheck
const state = {
    modal: null,
    createModal: null,
    editModal: null,
    accountModal: null,
    postModal: null
}

const getters = {
    isAuthModalOpen: state => !!state.modal,
    isAuthModalLogin: state => state.modal === 'login',
    isAuthModalForgotPassword: state => state.modal === 'forgot-password',
    isAuthModalRegisterStudent: state => state.modal === 'register-student',

    isCreateModalOpen: state => !!state.createModal,
    isCreateModalOverview: state => state.createModal === 'create-overview',
    isCreateModalCourse: state => state.createModal === 'create-course',
    isCreateModalQuestion: state => state.createModal === 'create-question',
    isCreateModalNote: state => state.createModal === 'create-note',
    isCreateModalBlog: state => state.createModal === 'create-blog-post',
    isCreateModalSubject: state => state.createModal === 'create-subject',

    isEditModalOpen: state => !!state.editModal,
    isEditModalQuestion: state => state.editModal === 'edit-question',
    isEditModalNote: state => state.editModal === 'edit-note',
    isEditModalBlog: state => state.editModal === 'edit-blog-post',
    isEditModalCourse: state => state.editModal === 'edit-course',
    isEditModalSubject: state => state.editModal === 'edit-subject',

    isAccountModalOpen: state => !!state.accountModal,
    isAccountModalOverview: state => state.accountModal === 'profile-overview',
    isAccountModalEditProfile: state => state.accountModal === 'edit-profile',
    isAccountModalUpdatePassword: state => state.accountModal === 'update-password',
    isAccountModalAddPaymentMethod: state => state.accountModal === 'add-payment-method',
    isAccountModalSelectSubscription: state => state.accountModal === 'select-subscription',
    isAccountModalMustSubscribeWarning: state => state.accountModal === 'must-subscribe-warning',

    isPostModalOpen: state => !!state.postModal,
    isPostModalNotify: state => state.postModal === 'post-notify',
    isPostModalBuyMore: state => state.postModal === 'buy-more',
}

const mutations = {
    setAuthModal: (state, mode) => state.modal = mode,
    setCreateModal: (state,mode) => state.createModal = mode,
    setEditModal: (state,mode) => state.editModal = mode,
    setAccountModal: (state, mode) => state.accountModal = mode,
    setPostModal: (state, mode) => state.postModal = mode
}

const actions = {
    setAuthModalLogin: ({ commit }) => commit('setAuthModal', 'login'),
    setAuthModalForgotPassword: ({ commit }) => commit('setAuthModal', 'forgot-password'),
    setAuthModalRegisterStudent: ({ commit }) => commit('setAuthModal', 'register-student'),
    closeAuthModal: ({ commit }) => commit('setAuthModal', null),

    setCreateModalOverview: ({ commit }) => commit('setCreateModal', 'create-overview'),
    setCreateModalCourse: ({ commit }) => commit('setCreateModal', 'create-course'),
    setCreateModalQuestion: ({ commit }) => commit('setCreateModal', 'create-question'),
    setCreateModalNote: ({ commit }) => commit('setCreateModal', 'create-note'),
    setCreateModalBlog: ({ commit }) => commit('setCreateModal', 'create-blog-post'),
    setCreateModalSubject: ({ commit }) => commit('setCreateModal', 'create-subject'),
    closeCreateModal: ({ commit }) => commit('setCreateModal', null),

    setEditModalQuestion: ({ commit }) => commit('setEditModal', 'edit-question'),
    setEditModalNote: ({ commit }) => commit('setEditModal', 'edit-note'),
    setEditModalBlog: ({ commit }) => commit('setEditModal', 'edit-blog-post'),
    setEditModalCourse: ({ commit }) => commit('setEditModal', 'edit-course'),
    setEditModalSubject: ({ commit }) => commit('setEditModal', 'edit-subject'),
    closeEditModal: ({ commit }) => commit('setEditModal', null),

    setAccountModalOverview: ({ commit }) => commit('setAccountModal', 'profile-overview'),
    setAccountModalEditProfile: ({ commit }) => commit('setAccountModal', 'edit-profile'),
    setAccountModalUpdatePassword: ({ commit }) => commit('setAccountModal', 'update-password'),
    setAccountModalAddPaymentMethod: ({ commit }) => commit('setAccountModal', 'add-payment-method'),
    setAccountModalSelectSubscription: ({ commit }) => commit('setAccountModal', 'select-subscription'),
    setAccountModalMustSubscribeWarning: ({ commit }) => commit('setAccountModal', 'must-subscribe-warning'),
    closeAccountModal: ({ commit }) => commit('setAccountModal', null),

    setPostModalNotify: ({ commit }) => commit('setPostModal','post-notify'),
    setPostModalBuyMore: ({ commit }) => commit('setPostModal','buy-more'),
    closePostModal: ({ commit }) =>  commit('setPostModal', null)
}

export default { state, getters, mutations, actions }
