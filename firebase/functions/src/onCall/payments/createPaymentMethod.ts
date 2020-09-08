import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { isProduction } from '../../helpers/environment'
import * as braintree from '../../helpers/braintree'

export const createPaymentMethod = functions.https.onCall(async ({ id, nonce }, context) => {
	if (isProduction() && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can create payment methods')
	}

	const doc = await admin.firestore().collection('users').doc(id).get()
	if(!doc.exists){ throw new functions.https.HttpsError('invalid-argument', 'User doesn\'t exist') }

	const customerId = doc.data()?.account?.customer_id
	if(!customerId){ throw new functions.https.HttpsError('invalid-argument', 'User doesn\'t have a valid customer id') }

	try{
		const result = await braintree.createPaymentMethod(customerId, nonce)

		if(result.success){
			const details = JSON.parse(JSON.stringify(result.paymentMethod))
			await admin.firestore().collection(`users/${id}/paymentMethods`).add({
				...details,
				dates: { createdAt: admin.firestore.FieldValue.serverTimestamp() }
			})
		}

		return result.success
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
