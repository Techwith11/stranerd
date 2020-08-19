import { Store } from '@/store'

const actions = {
	checkout: () => Store.dispatch('checkout')
}

export const Shop = {
	...actions
}
