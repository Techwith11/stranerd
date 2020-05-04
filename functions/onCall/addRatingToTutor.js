const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		/*TODO: Delete comment */ //throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can rate tutors')
	}

	let ref = admin.firestore().collection('users').doc(data.tutor)

	let reviews = {}
	reviews[data.session] = data['review']

	return await ref.set({
		tutor: { reviews }
	}, { merge: true })
})