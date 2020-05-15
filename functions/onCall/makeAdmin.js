const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (process.env.NODE_ENV === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can vote up requests')
	}
	await admin.auth().setCustomUserClaims(data.id, { isAdmin: true })
	return admin
		.firestore()
		.collection('users')
		.doc(data.id)
		.set({
			roles: { isAdmin: true }
		}, { merge: true })
})