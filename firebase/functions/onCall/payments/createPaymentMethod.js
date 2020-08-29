const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { createPaymentMethod } = require('../../helpers/braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can create payment methods')
	}
	let ref = await admin.firestore().collection('users').doc(data.id).get()
	if(!ref.exists){ throw new functions.https.HttpsError('invalid-argument', 'User doesn\'t exist') }
	let customerId = ref.data().account.customer_id
	if(!customerId){ throw new functions.https.HttpsError('invalid-argument', 'User doesn\'t have a valid customer id') }
	try{
		let result = await createPaymentMethod(customerId, data.nonce)
		if(result.success){
			let details = JSON.parse(JSON.stringify(result.paymentMethod))
			await admin.firestore().collection(`users/${data.id}/paymentMethods`).add({
				...details,
				dates: { createdAt: admin.firestore.FieldValue.serverTimestamp() }
			})
		}
		return result.success
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
