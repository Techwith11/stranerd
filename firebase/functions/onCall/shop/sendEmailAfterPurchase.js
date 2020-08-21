const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { sendPurchaseEmail } = require('../../emails/index')

module.exports = functions.https.onCall(async (data, context) => {
	if (functions.config().environment.mode === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can receive purchase emails')
	}
	try{
		let id = functions.config().environment.mode === 'production' ? context.auth.uid : data.id
		let user = (await admin.firestore().collection('users').doc(id).get()).data()
		let email = user.bio.email
		let cart = data.cart
		return await sendPurchaseEmail(email, user.bio, cart)
	}catch(error){ throw new functions.https.HttpsError('unknown', error.message) }
})
