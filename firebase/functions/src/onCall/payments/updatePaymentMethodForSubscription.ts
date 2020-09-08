import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'
import * as braintree from '../../helpers/braintree'

export const updatePaymentMethodForSubscription = functions.https.onCall(async (data, context) => {
	if (isProduction() && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can update subscriptions')
	}
	try{
		const ref = admin.firestore().collection('users').doc(data.id)
		const user = await ref.get()
		const account = user.data()?.account

		const result = await braintree.updatePaymentMethodForSubscription(account.subscription.id, data.token)

		if(result.success){
			const subscription = JSON.parse(JSON.stringify(result.subscription))
			await ref.set({ account: { subscription }}, { merge: true })
		}
		return result.success

	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
