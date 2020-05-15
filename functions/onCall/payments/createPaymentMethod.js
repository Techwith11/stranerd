const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')

module.exports = functions.https.onCall(async (data, context) => {
	if (process.env.NODE_ENV === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can create payment methods')
	}
	let ref = await admin.firestore().collection('users').doc(data.id).get()
	if(!ref.exists){ throw new functions.https.HttpsError('invalid-argument', 'User doesn\'t exist') }
	let customerId = ref.data().account.customer_id
	if(!customerId){ throw new functions.https.HttpsError('invalid-argument', 'User doesn\'t have a valid customer id') }
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
		let result = await gateway.paymentMethod.create({
			customerId,
			paymentMethodNonce: data.nonce
		})
		if(result.success){
			let details = JSON.parse(JSON.stringify(result.paymentMethod))
			await admin.firestore().collection(`users/${data.id}/paymentMethods`).add(details)
		}
		return result.success
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})