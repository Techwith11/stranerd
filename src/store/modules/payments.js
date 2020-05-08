import { functions } from '@/config/firebase'
import { client, hostedFields, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'

let paypalClientId = 'Ac-WzTkiNB9FEinROuMlVUfmCqLVQHRSjQooTDrVYBWHJBmIqtb_17u2zQ4SibWWNg8L02JUhkSSY7n_'
let getBraintreeClientToken = async () => {
	return functions.httpsCallable('getBraintreeClientToken')()
		.then(res => res.data)
		.catch(error => new window.Toast({ icon: 'error', title: error.message }))
}
let processPayment = async (data) => {
	return functions.httpsCallable('processPayment')(data)
		.then(res => res.data)
		.catch(error => new window.Toast({ icon: 'error', title: error.message }))
}

const state = {
	hostedFieldsInstance: null
}

const getters = {
	getHoistedFieldsInstance: state => state.hostedFieldsInstance,
	canPay: state => state.hostedFieldsInstance !== null
}

const mutations = {
	setHostedFieldsInstance: (state, instance) => state.hostedFieldsInstance = instance
}

const actions = {
	async initializePaymentFields({ commit }, data){
		try{
			let authorization = await getBraintreeClientToken()
			let clientInstance = await client.create({ authorization })
			let month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
			let year = new Date().getFullYear()
			let options = {
				client: clientInstance,
				styles: { input: { 'font-size': '14px' }},
				fields: {
					number: { selector: data['ids'].creditCard, placeholder: 'Enter Credit Card' },
					cvv: { selector: data['ids'].cvv, placeholder: 'Enter CVV' },
					expirationDate: { selector: data['ids'].expire, placeholder: `${month}/${year}` }
				}
			}
			commit('setHostedFieldsInstance',await hostedFields.create(options))
			let paypalInstance = await paypalCheckout.create({ client: clientInstance, client_id: paypalClientId })
			paypal.Button.render({
				env: 'sandbox',
				style: { label: 'paypal', size: 'large', shape: 'rect' },
				payment: () => paypalInstance.createPayment({
					flow: 'checkout',
					intent: 'sale',
					amount: data.amount,
					displayName: 'Stranerd',
					currency: 'USD'
				}),
				onAuthorize: async (info, options) => {
					let payload = await paypalInstance.tokenizePayment(options)
					let result = await processPayment({
						nonce: payload.nonce,
						amount: data.amount,
					})
					if(result){
						new window.Toast({ icon: 'success', title: 'Transaction successful.' })
					}else{
						new window.Toast({ icon: 'warning', title: 'Something unexpected happened' })
					}
					commit('setHostedFieldsInstance',null)
					data.onPaypalSuccessful()
				},
				onCancel: () => new window.Toast({ icon: 'warning', title: 'Transaction cancelled.' }),
				onError: error => new window.Toast({ icon: 'error', title: error.message })
			}, data['ids'].paypal)
		}catch(error){
			new window.Toast({ icon: 'error', title: error.message })
		}
	},
	async pay({ commit, getters }, amount) {
		if(amount < 1){ return new window.Toast({ icon: 'error', title: 'Invalid amount' }) }
		try{
			let payload = await getters.getHoistedFieldsInstance.tokenize()
			let result = await processPayment({
				nonce: payload.nonce,
				amount,
			})
			if(result){
				new window.Toast({ icon: 'success', title: 'Transaction successful.' })
			}else{
				new window.Toast({ icon: 'warning', title: 'Something unexpected happened' })
			}
			commit('setHostedFieldsInstance',null)
			return result
		}catch(error){
			new window.Toast({ icon: 'error', title: error.message })
		}
	},
}

export default { actions, mutations, state, getters }