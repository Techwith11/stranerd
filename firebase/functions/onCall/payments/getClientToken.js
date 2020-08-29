const functions = require('firebase-functions')
const braintree = require('braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	try{
		let environment = functions.config().environment.mode
		let gateway = braintree.connect({
			environment: braintree.Environment[environment === 'production' ? 'Production' : 'Sandbox'],
			merchantId: functions.config().braintree[environment]['merchant_id'],
			publicKey: functions.config().braintree[environment]['public_key'],
			privateKey: functions.config().braintree[environment]['private_key']
		})
		let paypalToken = functions.config().paypal[environment]['client_id']
		let token = await gateway.clientToken.generate()
		return {
			braintree: token.clientToken,
			paypal: paypalToken
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
