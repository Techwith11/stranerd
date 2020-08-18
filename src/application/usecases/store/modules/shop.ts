import store from '@/store'

const actions = {
	checkout: () => store.dispatch('checkout')
}

export const Shop = {
	...actions
}
