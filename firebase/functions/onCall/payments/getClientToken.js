const functions = require('firebase-functions')
const { environmentVariables } = require('../../helpers/environment')
const { getClientToken } = require('../../helpers/braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	try{
		let token = await getClientToken()
		return {
			braintree: token.clientToken,
			paypal: environmentVariables.paypal.clientId
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
