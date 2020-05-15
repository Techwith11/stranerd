import { functions } from '@/config/firebase'
import { client, hostedFields, paypalCheckout } from 'braintree-web'
import paypal from 'paypal-checkout'

let paypalClientId = 'Ac-WzTkiNB9FEinROuMlVUfmCqLVQHRSjQooTDrVYBWHJBmIqtb_17u2zQ4SibWWNg8L02JUhkSSY7n_'
let getBraintreeClientToken = async () => {
	return functions.httpsCallable('getClientToken')()
		.then(res => res.data)
		.catch(error => new window.Toast({ icon: 'error', title: error.message }))
}
let processPayment = async (data) => {
	return functions.httpsCallable('processPayment')(data)
		.then(res => res.data)
		.catch(error => new window.Toast({ icon: 'error', title: error.message }))
}
let createPaymentMethod = async (data) => {
	return functions.httpsCallable('createPaymentMethod')(data)
		.then(res => res.data)
		.catch(error => new window.Toast({ icon: 'error', title: error.message }))
}
let makePayment = async (data) => {
	return functions.httpsCallable('makePayment')(data)
		.then(res => res.data)
		.catch(error => new window.Toast({ icon: 'error', title: error.message }))
}
let subscribeToPlan = async (data) => {
	return functions.httpsCallable('subscribeToPlan')(data)
		.then(res => res.data)
		.catch(error => new window.Toast({ icon: 'error', title: error.message }))
}

const state = {
	hostedFieldsInstance: null
}

const getters = {
	getHoistedFieldsInstance: state => state.hostedFieldsInstance,
	canPay: state => state.hostedFieldsInstance !== null,
	isThereAHoistedFieldInstance: state => state.hostedFieldsInstance !== null
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
					number: { selector: '#creditCardNumber', placeholder: 'Enter Credit Card' },
					cvv: { selector: '#cvv', placeholder: 'Enter CVV' },
					expirationDate: { selector: '#expireDate', placeholder: `${month}/${year}` }
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
					if(result.success){
						new window.Toast({ icon: 'success', title: 'Transaction successful.' })
						commit('setHostedFieldsInstance',null)
					}else{
						new window.Toast({ icon: 'warning', title: 'Something unexpected happened' })
					}
					data.onPaypalSuccessful(result)
				},
				onCancel: () => new window.Toast({ icon: 'warning', title: 'Transaction cancelled.' }),
				onError: error => new window.Toast({ icon: 'error', title: error.message })
			}, '#paypalButton')
		}catch(error){
			new window.Toast({ icon: 'error', title: error.message })
		}
	},
	async initPaymentFields({ commit }){
		try{
			let authorization = await getBraintreeClientToken()
			let clientInstance = await client.create({ authorization })
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
			if(result.success){
				new window.Toast({ icon: 'success', title: 'Transaction successful.' })
				commit('setHostedFieldsInstance',null)
			}else{
				new window.Toast({ icon: 'warning', title: 'Something unexpected happened' })
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