const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can update payment methods')
	}
	try{
		let environment = functions.config().environment.mode
		let gateway = braintree.connect({
			environment: braintree.Environment[environment === 'production' ? 'Production' : 'Sandbox'],
			merchantId: functions.config().braintree[environment]['merchant_id'],
			publicKey: functions.config().braintree[environment]['public_key'],
			privateKey: functions.config().braintree[environment]['private_key']
		})
		let ref = admin.firestore().collection('users').doc(data.id)
		let user = await ref.get()
		let account = user.data().account
		let result = await gateway.subscription.update(account.subscription.id, {
			paymentMethodToken: data.token
		})
		if(result.success){
			let subscription = JSON.parse(JSON.stringify(result.subscription))
			await ref.set({ account: { subscription }}, { merge: true })
		}
		return result.success
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
