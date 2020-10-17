// @ts-nocheck
const state = {
	createModal: null,
	editModal: null,
	accountModal: null,
	postModal: null,
	cartModal: null
}

const getters = {
	isCreateModalOpen: (state) => !!state.createModal,
	isCreateModalOverview: (state) => state.createModal === 'create-overview',
	isCreateModalCourse: (state) => state.createModal === 'create-course',
	isCreateModalQuestion: (state) => state.createModal === 'create-question',
	isCreateModalNote: (state) => state.createModal === 'create-note',
	isCreateModalBlog: (state) => state.createModal === 'create-blog-post',
	isCreateModalSubject: (state) => state.createModal === 'create-subject',

	isEditModalOpen: (state) => !!state.editModal,
	isEditModalQuestion: (state) => state.editModal === 'edit-question',
	isEditModalNote: (state) => state.editModal === 'edit-note',
	isEditModalBlog: (state) => state.editModal === 'edit-blog-post',
	isEditModalCourse: (state) => state.editModal === 'edit-course',
	isEditModalSubject: (state) => state.editModal === 'edit-subject',

	isAccountModalOpen: (state) => !!state.accountModal,
	isAccountModalEditProfile: (state) => state.accountModal === 'edit-profile',
	isAccountModalUpdatePassword: (state) => state.accountModal === 'update-password',
	isAccountModalAddPaymentMethod: (state) => state.accountModal === 'add-payment-method',
	isAccountModalTransactions: (state) => state.accountModal === 'transactions',

	isPostModalOpen: (state) => !!state.postModal,
	isPostModalNotify: (state) => state.postModal === 'post-notify',
	isPostModalBuyMore: (state) => state.postModal === 'buy-more',

	isCartModalOpen: (state) => !!state.cartModal,
	isCartModalOverview: (state) => state.cartModal === 'cart-overview',
	isCartModalSelectPayment: (state) => state.cartModal === 'select-payment-method',
	isCartModalEmailConfirmation: (state) => state.cartModal === 'email-confirmation',
}

const mutations = {
	setCreateModal: (state,mode) => state.createModal = mode,
	setEditModal: (state,mode) => state.editModal = mode,
	setAccountModal: (state, mode) => state.accountModal = mode,
	setPostModal: (state, mode) => state.postModal = mode,
	setCartModal: (state, mode) => state.cartModal = mode,
}

const actions = {
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

	setAccountModalEditProfile: ({ commit }) => commit('setAccountModal', 'edit-profile'),
	setAccountModalUpdatePassword: ({ commit }) => commit('setAccountModal', 'update-password'),
	setAccountModalAddPaymentMethod: ({ commit }) => commit('setAccountModal', 'add-payment-method'),
	setAccountModalTransactions: ({ commit }) => commit('setAccountModal', 'transactions'),
	closeAccountModal: ({ commit }) => commit('setAccountModal', null),

	setPostModalNotify: ({ commit }) => commit('setPostModal','post-notify'),
	setPostModalBuyMore: ({ commit }) => commit('setPostModal','buy-more'),
	closePostModal: ({ commit }) =>  commit('setPostModal', null),

	setCartModalOverview({ commit }){ commit('setCartModal', 'cart-overview') },
	setCartModalPay({ commit }){ commit('setCartModal', 'select-payment-method') },
	setCartModalEmailConfirmation({ commit }){ commit('setCartModal', 'email-confirmation') },
	closeCartModal({ commit }){ commit('setCartModal', null) },
}

export default { state, getters, mutations, actions }
