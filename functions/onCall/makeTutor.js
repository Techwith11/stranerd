const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can be upgraded')
	}
	await admin.auth().setCustomUserClaims(data.id, { isTutor: true })

	return admin
		.firestore()
		.collection('users')
		.doc(data.id)
		.set({
			bio: data.bio,
			roles: { isTutor: true },
			tutor: { upgrade: {}, ...data.tutor }
		}, { merge: true })
})