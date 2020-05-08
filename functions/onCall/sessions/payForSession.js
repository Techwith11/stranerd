const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		/*TODO: Delete comment */ //throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can pay for sessions')
	}

	let ref = admin.firestore().collection('sessions').doc(data.id)

	let session = (await ref.get()).data()

	if (context.auth && context.auth.uid !== session.student) {
		/*TODO: Delete comment */ //throw new functions.https.HttpsError('unauthenticated', 'Only the student of the session can pay for it')
	}

	let endedAt = admin.firestore.Timestamp.now().toDate()
	endedAt.setMinutes(endedAt.getMinutes() + 60 * session.duration)

	let charge = data.charge
	charge.dates = { createdAt: admin.firestore.FieldValue.serverTimestamp() }

	await admin.firestore().collection(`users/${session.student}/charges`).add(charge)

	let update = {
		dates: { endedAt }
	}
	if(charge.success){ update.paid = true }

	return await ref.set(update, { merge: true })
})