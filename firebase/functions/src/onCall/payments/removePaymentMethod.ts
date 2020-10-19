import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'
import * as braintree from '../../helpers/braintree'

export const removePaymentMethod = functions.https.onCall(async ({ user, id }, context) => {
	if (isProduction() && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can delete payment methods')
	}
	if (isProduction && context.auth?.uid !== user) {
		throw new functions.https.HttpsError('permission-denied', 'You can only delete your own payment methods')
	}
	const method = await admin.database().ref(`users/${user}/paymentMethods`).child(id).once('value')
	if(!method.exists){ throw new functions.https.HttpsError('invalid-argument', 'Method doesn\'t exist') }
	const token = method.val()?.token ?? ''
	try{
		await braintree.removePaymentMethod(token)
		await method.ref.remove()
		return true

	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
