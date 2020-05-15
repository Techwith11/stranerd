const functions = require('firebase-functions')
const braintree = require('braintree')

module.exports = functions.https.onCall(async (data, context) => {
	if (process.env.NODE_ENV === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	try{
		let gateway = null
		let paypalToken = null
		if(functions.config().braintree.environment === 'live'){
			gateway = braintree.connect({
				environment: braintree.Environment.Production,
				merchantId: functions.config().braintree.live.merchant_id,
				publicKey: functions.config().braintree.live.public_key,
				privateKey: functions.config().braintree.live.private_key
			})
			paypalToken = functions.config().paypal.live.client_id
		}else{
			gateway = braintree.connect({
				environment: braintree.Environment.Sandbox,
				merchantId: functions.config().braintree.sandbox.merchant_id,
				publicKey: functions.config().braintree.sandbox.public_key,
				privateKey: functions.config().braintree.sandbox.private_key
			})
			paypalToken = functions.config().paypal.sandbox.client_id
		}
		let token = await gateway.clientToken.generate()
		return {
			braintree: token.clientToken,
			paypal: paypalToken
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})