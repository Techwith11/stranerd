const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		/*TODO: Delete comment */ //throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can trigger updates')
	}
	await admin.firestore().collection('users').doc(data.from).update({
		chattedWith: admin.firestore.FieldValue.arrayUnion(data.to)
	})
	await admin.firestore().collection('users').doc(data.to).update({
		chattedWith: admin.firestore.FieldValue.arrayUnion(data.from)
	})
	return true
})