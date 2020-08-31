import functions from 'firebase-functions'
import admin from'firebase-admin'
import { isProduction } from '../../helpers/environment'
import { cancelSubscription } from '../../helpers/braintree'

export default functions.https.onCall(async ({ id }, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can cancel subscriptions')
	}
	try{
		const ref = admin.firestore().collection('users').doc(id)
		const user = await ref.get()
		const account = user.data()?.account ?? {}
		if(account.subscription && account.subscription.id){
			await cancelSubscription(account.subscription.id)
			await ref.update('account.subscription', {})
			return true
		}else{
			throw new functions.https.HttpsError('failed-precondition', 'You do not have an active subscription')
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
