import { Store } from '@/store'
import { computed, ComputedRef } from '@vue/composition-api'

const getters = {
	isAuthModalLogin: computed(() => Store.getters.isAuthModalLogin) as ComputedRef<boolean>,
	isAuthModalForgotPassword: computed(() => Store.getters.isAuthModalForgotPassword) as ComputedRef<boolean>,
	isAuthModalRegisterStudent: computed(() => Store.getters.isAuthModalRegisterStudent) as ComputedRef<boolean>,

	isCreateModalOverview: computed(() => Store.getters.isCreateModalOverview) as ComputedRef<boolean>,
	isCreateModalCourse: computed(() => Store.getters.isCreateModalCourse) as ComputedRef<boolean>,
	isCreateModalQuestion: computed(() => Store.getters.isCreateModalQuestion) as ComputedRef<boolean>,
	isCreateModalNote: computed(() => Store.getters.isCreateModalNote) as ComputedRef<boolean>,
	isCreateModalBlog: computed(() => Store.getters.isCreateModalBlog) as ComputedRef<boolean>,
	isCreateModalSubject: computed(() => Store.getters.isCreateModalSubject) as ComputedRef<boolean>,

	isEditModalCourse: computed(() => Store.getters.isEditModalCourse) as ComputedRef<boolean>,
	isEditModalQuestion: computed(() => Store.getters.isEditModalQuestion) as ComputedRef<boolean>,
	isEditModalNote: computed(() => Store.getters.isEditModalNote) as ComputedRef<boolean>,
	isEditModalBlog: computed(() => Store.getters.isEditModalBlog) as ComputedRef<boolean>,
	isEditModalSubject: computed(() => Store.getters.isEditModalSubject) as ComputedRef<boolean>,
}

const actions = {
	setAuthModalLogin: () => Store.dispatch('setAuthModalLogin'),
	setAuthModalRegisterStudent: () => Store.dispatch('setAuthModalRegisterStudent'),
	setAuthModalForgotPassword: () => Store.dispatch('setAuthModalForgotPassword'),

	setPostModalNotify: () => Store.dispatch('setPostModalNotify'),

	setCartModalPay: () => Store.dispatch('setCartModalPay'),

	setCartModalOverview: () => Store.dispatch('setCartModalOverview'),

	setAccountModalOverview: () => Store.dispatch('setAccountModalOverview'),
	setAccountModalAddPaymentMethod: () => Store.dispatch('setAccountModalAddPaymentMethod'),
	setAccountModalEditProfile: () => Store.dispatch('setAccountModalEditProfile'),
	setAccountModalUpdatePassword: () => Store.dispatch('setAccountModalUpdatePassword'),
	setAccountModalSelectSubscription: () => Store.dispatch('setAccountModalSelectSubscription'),

	setCreateModalOverview: () => Store.dispatch('setCreateModalOverview'),
	setCreateModalArticle: () => Store.dispatch('setCreateModalBlog'),
	setCreateModalQuestion: () => Store.dispatch('setCreateModalQuestion'),
	setCreateModalCourse: () => Store.dispatch('setCreateModalCourse'),
	setCreateModalNote: () => Store.dispatch('setCreateModalNote'),
	setCreateModalSubject: () => Store.dispatch('setCreateModalSubject'),

	setEditModalCourse: () => Store.dispatch('setEditModalCourse'),
	setEditModalNote: () => Store.dispatch('setEditModalNote'),
	setEditModalSubject: () => Store.dispatch('setEditModalSubject'),
	setEditModalArticle: () => Store.dispatch('setEditModalBlog'),
	setEditModalQuestion: () => Store.dispatch('setEditModalQuestion'),

	setSessionModalStudentDuration: (data: { student: string, tutor: string }) => Store.dispatch('setSessionModalStudentDuration', data),

	closeAccountModal: () => Store.dispatch('closeAccountModal'),
	closeAuthModal: () => Store.dispatch('closeAuthModal'),
	closeCartModal: () => Store.dispatch('closeCartModal'),
	closeCreateModal: () => Store.dispatch('closeCreateModal'),
	closeEditModal: () => Store.dispatch('closeEditModal'),
}

export const Modals = {
	...getters,
	...actions
}
