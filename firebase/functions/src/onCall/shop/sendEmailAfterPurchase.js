const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { isProduction } = require('../../helpers/environment')
const { sendPurchaseEmail } = require('../../emails')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can receive purchase emails')
	}
	try{
		let id = isProduction ? context.auth.uid : data.id
		let user = (await admin.firestore().collection('users').doc(id).get()).data()
		let email = user.bio.email
		let cart = data.cart
		return await sendPurchaseEmail(email, user.bio, cart)
	}catch(error){ throw new functions.https.HttpsError('unknown', error.message) }
})
