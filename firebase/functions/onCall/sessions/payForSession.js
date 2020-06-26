const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	try{
		if (functions.config().environment.mode === 'production' && !context.auth) {
			throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can pay for sessions')
		}

		let ref = admin.firestore().collection('sessions').doc(data.id)

		let session = (await ref.get()).data()

		if (functions.config().environment.mode === 'production' && context.auth && context.auth.uid !== session.student) {
			throw new functions.https.HttpsError('failed-precondition', 'Only the student of the session can pay for it')
		}

		let endedAt = admin.firestore.Timestamp.now().toDate()
		endedAt.setMinutes(endedAt.getMinutes() + 60 * session.duration)

		return await ref.set({ dates: { endedAt }, paid: true }, { merge: true })
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})