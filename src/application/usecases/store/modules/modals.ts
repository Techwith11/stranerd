import store from '@/store'
import { computed, ComputedRef } from '@vue/composition-api'

const getters = {
	isAuthModalLogin: computed(() => store.getters.isAuthModalLogin) as ComputedRef<boolean>,
	isAuthModalForgotPassword: computed(() => store.getters.isAuthModalForgotPassword) as ComputedRef<boolean>,
	isAuthModalRegisterStudent: computed(() => store.getters.isAuthModalRegisterStudent) as ComputedRef<boolean>,

	isCreateModalOverview: computed(() => store.getters.isCreateModalOverview) as ComputedRef<boolean>,
	isCreateModalCourse: computed(() => store.getters.isCreateModalCourse) as ComputedRef<boolean>,
	isCreateModalQuestion: computed(() => store.getters.isCreateModalQuestion) as ComputedRef<boolean>,
	isCreateModalNote: computed(() => store.getters.isCreateModalNote) as ComputedRef<boolean>,
	isCreateModalBlog: computed(() => store.getters.isCreateModalBlog) as ComputedRef<boolean>,
	isCreateModalSubject: computed(() => store.getters.isCreateModalSubject) as ComputedRef<boolean>,

	isEditModalCourse: computed(() => store.getters.isEditModalCourse) as ComputedRef<boolean>,
	isEditModalQuestion: computed(() => store.getters.isEditModalQuestion) as ComputedRef<boolean>,
	isEditModalNote: computed(() => store.getters.isEditModalNote) as ComputedRef<boolean>,
	isEditModalBlog: computed(() => store.getters.isEditModalBlog) as ComputedRef<boolean>,
	isEditModalSubject: computed(() => store.getters.isEditModalSubject) as ComputedRef<boolean>,
}

const actions = {
	setAuthModalLogin: () => store.dispatch('setAuthModalLogin'),
	setAuthModalRegisterStudent: () => store.dispatch('setAuthModalRegisterStudent'),
	setAuthModalForgotPassword: () => store.dispatch('setAuthModalForgotPassword'),

	setPostModalNotify: () => store.dispatch('setPostModalNotify'),

	setCartModalPay: () => store.dispatch('setCartModalPay'),

	setCartModalOverview: () => store.dispatch('setCartModalOverview'),

	setAccountModalOverview: () => store.dispatch('setAccountModalOverview'),

	setCreateModalArticle: () => store.dispatch('setCreateModalBlog'),
	setCreateModalQuestion: () => store.dispatch('setCreateModalQuestion'),
	setCreateModalCourse: () => store.dispatch('setCreateModalCourse'),
	setCreateModalNote: () => store.dispatch('setCreateModalNote'),
	setCreateModalSubject: () => store.dispatch('setCreateModalSubject'),

	setEditModalCourse: () => store.dispatch('setEditModalCourse'),
	setEditModalNote: () => store.dispatch('setEditModalNote'),
	setEditModalSubject: () => store.dispatch('setEditModalSubject'),
	setEditModalArticle: () => store.dispatch('setEditModalBlog'),
	setEditModalQuestion: () => store.dispatch('setEditModalQuestion'),

	setSessionModalStudentDuration: (data: { student: string, tutor: string }) => store.dispatch('setSessionModalStudentDuration', data),

	closeAccountModal: () => store.dispatch('closeAccountModal'),
	closeAuthModal: () => store.dispatch('closeAuthModal'),
	closeCartModal: () => store.dispatch('closeCartModal'),
	closeCreateModal: () => store.dispatch('closeCreateModal'),
	closeEditModal: () => store.dispatch('closeEditModal'),
}

export const Modals = {
	...getters,
	...actions
}
