const functions = require('firebase-functions')
const { getClientToken } = require('../../helpers/braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	try{
		let environment = functions.config().environment.mode
		let paypalToken = functions.config().paypal[environment]['client_id']

		let token = await getClientToken()
		return {
			braintree: token.clientToken,
			paypal: paypalToken
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
