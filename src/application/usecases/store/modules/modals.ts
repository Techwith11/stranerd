import store from '@/store'

const actions = {
	setAuthModalLogin: () => store.dispatch('setAuthModalLogin'),

	setPostModalNotify: () => store.dispatch('setPostModalNotify'),

	setCartModalPay: () => store.dispatch('setCartModalPay'),

	closeAccountModal: () => store.dispatch('closeAccountModal'),
	closeAuthModal: () => store.dispatch('closeAuthModal'),
	closeCartModal: () => store.dispatch('closeCartModal'),
	closeCreateModal: () => store.dispatch('closeCreateModal'),
	closeEditModal: () => store.dispatch('closeEditModal'),
}

export const Modals = {
	...actions
}
