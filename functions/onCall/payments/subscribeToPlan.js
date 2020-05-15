const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')

let planIds = [
	'stranerd_monthly_amateur_plan', 'stranerd_monthly_intermediate_plan', 'stranerd_monthly_master_plan',
	'stranerd_yearly_amateur_plan', 'stranerd_yearly_intermediate_plan', 'stranerd_yearly_master_plan'
]

module.exports = functions.https.onCall(async (data, context) => {
	if (process.env.NODE_ENV === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	if(!planIds.includes(data.planId)){ throw new functions.https.HttpsError('invalid-argument', 'Invalid plan id') }
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
		let ref = admin.firestore().collection('users').doc(data.id)
		let user = await ref.get()
		let account = user.data().account
		if(account.subscription && account.subscription.id){
			if(account.subscription.planId === data.planId){
				throw new functions.https.HttpsError('invalid-argument', 'You are already on this plan')
			}
			await gateway.subscription.cancel(account.subscription.id)
		}
		let result = await gateway.subscription.create({
			planId: data.planId,
			paymentMethodToken: data.token,
		})
		if(result.success){
			let subscription = JSON.parse(JSON.stringify(result.subscription))
			await ref.set({ account: { subscription }}, { merge: true })
		}
		return result.success
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})