const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { updatePaymentMethodForSubscription } = require('../../helpers/braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can update subscriptions')
	}
	try{
		let ref = admin.firestore().collection('users').doc(data.id)
		let user = await ref.get()
		let account = user.data().account

		let result = await updatePaymentMethodForSubscription(account.subscription.id, data.token)

		if(result.success){
			let subscription = JSON.parse(JSON.stringify(result.subscription))
			await ref.set({ account: { subscription }}, { merge: true })
		}
		return result.success

	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
