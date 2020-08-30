const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { subscribeToPlan, cancelSubscription } = require('../../helpers/braintree')
const { isProduction } = require('../../helpers/environment')

let planIds = [
	'stranerd_monthly_amateur_plan', 'stranerd_monthly_intermediate_plan', 'stranerd_monthly_master_plan',
	'stranerd_yearly_amateur_plan', 'stranerd_yearly_intermediate_plan', 'stranerd_yearly_master_plan'
]

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	if(!planIds.includes(data.planId)){ throw new functions.https.HttpsError('invalid-argument', 'Invalid plan id') }
	try{
		let ref = admin.firestore().collection('users').doc(data.id)
		let user = await ref.get()
		let account = user.data().account
		if(account.subscription && account.subscription.id){
			if(account.subscription.planId === data.planId){
				throw new functions.https.HttpsError('invalid-argument', 'You are already on this plan')
			}
			let result = await cancelSubscription(account.subscription.id)
			if(result.success){
				await ref.update('account.subscription', {})
			}
		}
		let result = await subscribeToPlan(data.planId, data.token)

		if(result.success){
			let subscription = JSON.parse(JSON.stringify(result.subscription))
			await ref.set({ account: { subscription }}, { merge: true })
		}
		return result.success

	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
