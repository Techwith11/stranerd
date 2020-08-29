const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upgrade accounts')
	}
	if (isProduction && !context.auth.token.isAdmin) {
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can downgrade users')
	}
	try{
		if (isProduction){
			await admin.auth().setCustomUserClaims(data.id, { isAdmin: false })
		}
		await admin
			.firestore()
			.collection('users')
			.doc(data.id)
			.set({
				roles: { isAdmin: false }
			}, { merge: true })
		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
