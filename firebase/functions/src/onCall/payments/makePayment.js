const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { makePayment } = require('../../helpers/braintree')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can invoke payments')
	}
	try{
		let result = await makePayment(data.amount, data.token)

		if(result.success) {
			let transaction = JSON.parse(JSON.stringify(result.transaction))
			await admin.firestore().collection(`users/${data.id}/transactions`).add({
				...transaction,
				dates: { createdAt: admin.firestore.FieldValue.serverTimestamp() }
			})
		}
		return result.success

	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
