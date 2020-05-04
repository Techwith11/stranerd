const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		/*TODO: Delete comment */ //throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can accept sessions')
	}

	let ref = admin.firestore().collection('sessions').doc(data)

	let session = (await ref.get()).data()

	if (context.auth && context.auth.uid !== session.tutor) {
		/*TODO: Delete comment */ //throw new functions.https.HttpsError('unauthenticated', 'Only the tutor of the session can accept it')
	}

	let endedAt = admin.firestore.Timestamp.now().toDate()
	endedAt.setMinutes(endedAt.getMinutes() + 60 * session.duration)

	return await admin.firestore().collection('sessions').doc(data).set({
		accepted: true,
		dates: { endedAt }
	}, { merge: true})
})