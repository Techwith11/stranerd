const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')

module.exports = functions.https.onCall(async (data, context) => {
	if (functions.config().environment.mode === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	try{
		let environment = functions.config().environment.mode
		let gateway = braintree.connect({
			environment: braintree.Environment[environment === 'production' ? 'Production' : 'Sandbox'],
			merchantId: functions.config().braintree[environment]['merchant_id'],
			publicKey: functions.config().braintree[environment]['public_key'],
			privateKey: functions.config().braintree[environment]['private_key']
		})
		let result = await gateway.transaction.sale({
			amount: data.amount,
			paymentMethodToken: data.token,
		})
		if(result.success) {
			let transaction = JSON.parse(JSON.stringify(result.transaction))
			await admin.firestore().collection(`users/${data.id}/transactions`).add(transaction)
		}
		return result.success
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})