import * as functions from 'firebase-functions'
import { environmentVariables } from '../../helpers/environment'
import * as braintree from '../../helpers/braintree'

export const getClientToken = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}

	try{
		const token = await braintree.getClientToken()
		return {
			braintree: token.clientToken,
			paypal: environmentVariables.paypal.clientSecret
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
