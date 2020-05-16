import { functions } from '@/config/firebase'
import { client, hostedFields, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'

let getBraintreeClientToken = async () => functions.httpsCallable('getClientToken')()
	.then(res => res.data)
	.catch(error => new window.Toast({icon: 'error', title: error.message}))
let createPaymentMethod = async (data) => functions.httpsCallable('createPaymentMethod')(data)
	.then(res => res.data)
	.catch(error => new window.Toast({ icon: 'error', title: error.message }))
let makePayment = async (data) => functions.httpsCallable('makePayment')(data)
	.then(res => res.data)
	.catch(error => new window.Toast({ icon: 'error', title: error.message }))
let subscribeToPlan = async (data) => functions.httpsCallable('subscribeToPlan')(data)
	.then(res => res.data)
	.catch(error => new window.Toast({ icon: 'error', title: error.message }))

const state = {
	hostedFieldsInstance: null
}

const getters = {
	getHoistedFieldsInstance: state => state.hostedFieldsInstance,
	isThereAHoistedFieldInstance: state => state.hostedFieldsInstance !== null
}

const mutations = {
	setHostedFieldsInstance: (state, instance) => state.hostedFieldsInstance = instance
}

const actions = {
	async initPaymentFields({ getters, commit }, data){
		try{
			let tokens = await getBraintreeClientToken()
			let clientInstance = await client.create({ authorization: tokens.braintree })
			let month = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1
			let year = new Date().getFullYear()
			let options = {
				client: clientInstance,
				styles: { input: { 'font-size': '14px' }},
				fields: {
					number: { selector: '#creditCardNumber', placeholder: 'Enter Credit Card' },
					cvv: { selector: '#cvv', placeholder: 'Enter CVV' },
					expirationDate: { selector: '#expireDate', placeholder: `${month}/${year}` }
				}
			}
			commit('setHostedFieldsInstance',await hostedFields.create(options))
			let paypalInstance = await paypalCheckout.create({ client: clientInstance, client_id: tokens.paypal })
			paypal.Button.render({
				env: 'sandbox',
				style: { label: 'paypal', size: 'large', shape: 'rect' },
				payment: () => paypalInstance.createPayment({
					flow: 'vault',
					displayName: 'Stranerd',
					currency: 'USD'
				}),
				onAuthorize: async (info, options) => {
					let payload = await paypalInstance.tokenizePayment(options)
					let result = await createPaymentMethod({
						id: getters.getId,
						nonce: payload.nonce
					})
					if(result === true){
						new window.Toast({ icon: 'success', title: 'Paypal account added successfully' })
						data.onPayPalAuthorization(result)
					}else {
						new window.Toast({icon: 'error', title: 'Error adding paypal account'})
					}
					data.onPayPalAuthorization(result)
				},
				onCancel: () => new window.Toast({ icon: 'warning', title: 'Account addition cancelled.' }),
				onError: error => new window.Toast({ icon: 'error', title: error.message })
			}, '#paypalButton')
		}catch(error){
			new window.Toast({ icon: 'error', title: error.message })
		}
	},
	async createPaymentMethod({ getters }){
		try {
			let payload = await getters.getHoistedFieldsInstance.tokenize()
			let result = await createPaymentMethod({
				id: getters.getId,
				nonce: payload.nonce
			})
			if(result === true){
				new window.Toast({ icon: 'success', title: 'Card added successfully' })
			}else{
				new window.Toast({ icon: 'error', title: 'Error adding card' })
			}
			return result
		}catch(error){
			new window.Toast({ icon: 'error', title: error.message })
		}
	},
	async makePayment({ getters }, data){
		if(data.amount < 1){ return new window.Toast({ icon: 'error', title: 'Invalid amount' }) }
		try{
			let result = await makePayment({ ...data, id: getters.getId })
			if(result === true){
				new window.Toast({ icon: 'success', title: 'Transaction successful.' })
			}else{
				new window.Toast({ icon: 'warning', title: 'Something unexpected happened' })
			}
			return result
		}catch(error){
			new window.Toast({ icon: 'error', title: error.message })
		}
	},
	async subscribeToPlan({ getters }, data){
		try{
			let result = await subscribeToPlan({ ...data, id: getters.getId })
			if(result === true){
				new window.Toast({ icon: 'success', title: 'Subscription successful.' })
			}else{
				new window.Toast({ icon: 'warning', title: 'Something unexpected happened' })
			}
			return result
		}catch(error){
			new window.Toast({ icon: 'error', title: error.message })
		}
	}
}

export default { actions, mutations, state, getters }