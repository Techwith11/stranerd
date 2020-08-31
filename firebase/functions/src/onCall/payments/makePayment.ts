import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'
import * as braintree from '../../helpers/braintree'

export const makePayment = functions.https.onCall(async ({ id, amount, token }, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	try{
		const result = await braintree.makePayment(amount, token)

		if(result.success) {
			const transaction = JSON.parse(JSON.stringify(result.transaction))
			await admin.firestore().collection(`users/${id}/transactions`).add({
				...transaction,
				dates: { createdAt: admin.firestore.FieldValue.serverTimestamp() }
			})
		}
		return result.success

	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
