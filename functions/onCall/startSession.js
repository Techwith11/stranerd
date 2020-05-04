const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		/*TODO: Delete comment */ //throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can start sessions')
	}

	let createdAt = admin.firestore.Timestamp.now()

	let docs = await admin.firestore().collection('sessions')
		.where('tutor','==', data.tutor)
		.where('dates.endedAt','>', createdAt)
		.limit(1)
		.get()
	if(!docs.empty){
		throw new functions.https.HttpsError('failed-precondition','Tutor is currently in a session')
	}

	let session = {
		duration: data.duration,
		student: data.student,
		tutor: data.tutor,
		accepted: false,
		cancelled: { student: false, tutor: false },
		dates: { createdAt }
	}

	let doc = await admin.firestore().collection('sessions').add(session)

	return doc.id
})