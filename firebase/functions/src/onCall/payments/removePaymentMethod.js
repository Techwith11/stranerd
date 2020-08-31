const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { removePaymentMethod } = require('../../helpers/braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can delete payment methods')
	}
	if (isProduction && context.auth.uid !== data.user) {
		throw new functions.https.HttpsError('permission-denied', 'You can only delete your own payment methods')
	}
	let method = await admin.firestore().collection(`users/${data.user}/paymentMethods`).doc(data.id).get()
	if(!method.exists){ throw new functions.https.HttpsError('invalid-argument', 'Method doesn\'t exist') }
	let token = method.data().token
	try{
		let result = await removePaymentMethod(token)

		if(result.success){
			await method.ref.delete()
		}
		return result.success

	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
