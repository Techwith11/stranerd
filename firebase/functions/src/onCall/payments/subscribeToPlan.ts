import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'
import * as braintree from '../../helpers/braintree'

const planIds = [
	'stranerd_monthly_amateur_plan', 'stranerd_monthly_intermediate_plan', 'stranerd_monthly_master_plan',
	'stranerd_yearly_amateur_plan', 'stranerd_yearly_intermediate_plan', 'stranerd_yearly_master_plan'
]

export const subscribeToPlan = functions.https.onCall(async (data, context) => {
	if (isProduction() && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	if(!planIds.includes(data.planId)){ throw new functions.https.HttpsError('invalid-argument', 'Invalid plan id') }
	try{
		const ref = admin.firestore().collection('users').doc(data.id)
		const user = await ref.get()
		const account = user.data()?.account
		if(account?.subscription?.id){
			if(account.subscription.planId === data.planId){
				throw new functions.https.HttpsError('invalid-argument', 'You are already on this plan')
			}
			await braintree.cancelSubscription(account.subscription.id)
			await ref.update('account.subscription', {})
		}
		const result = await braintree.subscribeToPlan(data.planId, data.token)

		if(result.success){
			const subscription = JSON.parse(JSON.stringify(result.subscription))
			await ref.set({ account: { subscription }}, { merge: true })
		}

		return result.success

	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
