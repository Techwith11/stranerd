import { functions } from '@/config/firebase'

const helpers = {
	checkout: async cart => (await functions.httpsCallable('checkout')(cart)).data
}

const state = {
	cart: [],
	cartModalOpen: false,
	cartModalState: null
}

const getters = {
	getCart: state => state.cart,
	getCartPrice: state => state.cart.map(item => item.price).reduce((a,b) => a + b),
	getCartLength: state => state.cart.length,
	isInCart: state => item => state.cart.some(x => x['.key'] === item['.key']),
	isCartModalOpen: state => state.cartModalOpen,
	isCartModalOverview: state => state.cartModalState === 'cart-overview',
	isCartModalSelectPayment: state => state.cartModalState === 'select-payment-method',
}

const mutations = {
	addToCart: (state, item) => {
		state.cart.push(item)
	},
	checkout: (state) => {
		state.cartModalOpen = false
		state.cart = []
	},
	removeFromCart: (state, item) => {
		state.cart = state.cart.filter(x => x['.key'] !== item['.key'])
		if(state.cart.length === 0){
			state.cartModalOpen = false
		}
	},
	setCartModalState: (state, mode) => {
		state.cartModalState = mode
		state.cartModalOpen = true
	},
	setCartModalOpen: (state, open) => {
		open ? state.cartModalState = 'cart-overview' : null
		state.cartModalOpen = open
	}
}

const actions = {
	openCartModal({ commit }){ commit('setCartModalOpen', true) },
	closeCartModal({ commit }){ commit('setCartModalOpen', false) },
	addToCart({ commit  }, note){ commit('addToCart', note) },
	removeFromCart({ commit }, note){ commit('removeFromCart', note) },
	proceedToPay({ commit }){ commit('setCartModalState', 'select-payment-method') },
	async checkout({ getters, commit }){
		try{
			console.log(helpers.checkout,getters.getCart)
			commit('checkout')
		}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
	},
}

export default { state, getters, mutations, actions }