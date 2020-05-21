const state = {
	cart: window.localStorage.getItem('user_cart') ? JSON.parse(window.localStorage.getItem('user_cart')) : [],
	cartModalOpen: false,
	cartModalState: null
}

const getters = {
	getCart: state => state.cart,
	getCartLength: state => state.cart.length,
	isInCart: state => item => state.cart.some(x => x['.key'] === item['.key']),
	isCartModalOpen: state => state.cartModalOpen,
	isCartModalOverview: state => state.cartModalState === 'cart-overview'
}

const mutations = {
	addToCart: (state, item) => {
		state.cart.push(item)
		window.localStorage.setItem('user_cart', JSON.stringify(state.cart))
	},
	checkout: (state) => {
		state.cart = []
		window.localStorage.setItem('user_cart', JSON.stringify(state.cart))
	},
	removeFromCart: (state, item) => {
		state.cart = state.cart.filter(x => x['.key'] !== item['.key'])
		window.localStorage.setItem('user_cart', JSON.stringify(state.cart))
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
	addToCart({ commit  }, note){
		commit('addToCart', note)
	},
	async checkout({ commit }){
		console.log(commit)
		//TODO: commit checkout after everything
		// commit('checkout')
	},
	removeFromCart({ commit }, note){
		commit('removeFromCart', note)
	},
	openCartModal({ commit }){ commit('setCartModalOpen', true) },
	closeCartModal({ commit }){ commit('setCartModalOpen', false) },
}

export default { state, getters, mutations, actions }