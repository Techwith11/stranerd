import { firestore, functions } from '@/config/firebase'

const helpers = {
	sendEmailAfterPurchase: async data => (await functions.httpsCallable('sendEmailAfterPurchase')(data)).data,
	addMoreQuestions: async data => await firestore.collection('users').doc(data.id).update('account.questions', data.quantity)
}

const state = {
	cart: [],
	cartModal: null
}

const getters = {
	getCart: state => state.cart,
	getCartPrice: state => state.cart.map(item => parseFloat(item.price)).reduce((a,b) => a + b),
	getCartLength: state => state.cart.length,
	isInCart: state => item => state.cart.some(x => x['.key'] === item['.key']),

	isCartModalOpen: state => !!state.cartModal,
	isCartModalOverview: state => state.cartModal === 'cart-overview',
	isCartModalSelectPayment: state => state.cartModal === 'select-payment-method',
	isCartModalEmailConfirmation: state => state.cartModal === 'email-confirmation',
}

const mutations = {
	addToCart: (state, item) => {
		if(!state.cart.find(x => x['.key'] === item['.key'])){
			state.cart.push(item)
		}
	},
	checkout: (state) => {
		state.cart = []
	},
	removeFromCart: (state, item) => {
		state.cart = state.cart.filter(x => x['.key'] !== item['.key'])
		if(state.cart.length === 0){
			state.cartModal = null
		}
	},
	setCartModal: (state, mode) => state.cartModal = mode,
}

const actions = {
	setCartModalOverview({ commit }){ commit('setCartModal', 'cart-overview') },
	setCartModalPay({ commit }){ commit('setCartModal', 'select-payment-method') },
	closeCartModal({ commit }){ commit('setCartModal', null) },

	addToCart({ commit }, note){ commit('addToCart', note) },
	removeFromCart({ commit }, note){ commit('removeFromCart', note) },

	async checkout({ getters, commit }){
		try{
			await helpers.sendEmailAfterPurchase({ cart: getters.getCart, id: getters.getId })
			commit('checkout')
		}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
		commit('setCartModal', 'email-confirmation')
	},

	async addMoreQuestions({ getters }, quantity){
		return await helpers.addMoreQuestions({ id: getters.getId, quantity })
	}
}

export default { state, getters, mutations, actions }