const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (functions.config().environment.mode === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upgrade accounts')
	}
	if (functions.config().environment.mode === 'production' && !context.auth.token.isAdmin) {
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can be upgrade users')
	}
	try{
		if (functions.config().environment.mode === 'production'){
			await admin.auth().setCustomUserClaims(data, { isAdmin: true })
		}
		await admin
			.firestore()
			.collection('users')
			.doc(data)
			.set({
				roles: { isAdmin: true }
			}, { merge: true })
		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})