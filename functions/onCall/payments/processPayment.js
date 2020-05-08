const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')

module.exports = functions.https.onCall(async (data, context) => {
	/*if (!context.auth) {
		/!*TODO: Delete comment *!/ //throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}*/
	try{
		let gateway = braintree.connect({
			environment: braintree.Environment.Sandbox,
			merchantId: '6f9mkyr3h4k9gvjk',
			publicKey: 'c57yb9sm9fc79c9x',
			privateKey: 'bb26a3a051b5d1da5f430872c820f616',
		})
		let result = await gateway.transaction.sale({
			amount: data.amount,
			paymentMethodNonce: data.nonce,
		})
		/* TODO: Save result to auth user charges history */
		return result.success
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})