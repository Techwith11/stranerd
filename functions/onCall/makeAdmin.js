const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can vote up requests')
	}
	await admin.auth().setCustomUserClaims(data.id, { isAdmin: true })
	return admin
		.firestore()
		.collection('users')
		.doc(data.id)
		.update({
			...data.user,
			bio: {
				roles: { isAdmin: true }
			},
		})
})