const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can cancel subscriptions')
	}
	try{
		let environment = functions.config().environment.mode
		let gateway = braintree.connect({
			environment: braintree.Environment[environment === 'production' ? 'Production' : 'Sandbox'],
			merchantId: functions.config().braintree[environment]['merchant_id'],
			publicKey: functions.config().braintree[environment]['public_key'],
			privateKey: functions.config().braintree[environment]['private_key']
		})
		let id = environment === 'production' ? context.auth.uid : data.id
		let ref = admin.firestore().collection('users').doc(id)
		let user = await ref.get()
		let account = user.data().account
		if(account.subscription && account.subscription.id){
			let result = await gateway.subscription.cancel(account.subscription.id)
			if(result.success){
				await ref.update('account.subscription', {})
			}
			return result.success
		}else{
			throw new functions.https.HttpsError('failed-precondition', 'You do not have an active subscription')
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
