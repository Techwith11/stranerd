const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')

module.exports = functions.https.onCall(async (data, context) => {
	if (process.env.NODE_ENV === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	try{
		let gateway = null
		if(functions.config().braintree.environment === 'live'){
			gateway = braintree.connect({
				environment: braintree.Environment.Production,
				merchantId: functions.config().braintree.live.merchant_id,
				publicKey: functions.config().braintree.live.public_key,
				privateKey: functions.config().braintree.live.private_key
			})
		}else{
			gateway = braintree.connect({
				environment: braintree.Environment.Sandbox,
				merchantId: functions.config().braintree.sandbox.merchant_id,
				publicKey: functions.config().braintree.sandbox.public_key,
				privateKey: functions.config().braintree.sandbox.private_key
			})
		}
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