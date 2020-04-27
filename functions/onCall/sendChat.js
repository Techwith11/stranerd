const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		/*TODO: Remove comment */ throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can send messages')
	}
	let chatDefaults = {
		dates: {
			sentAt: admin.firestore.FieldValue.serverTimestamp(),
			readAt: null
		}
	}
	let from = context.auth ? context.auth.uid : 'kevin11'
	let to = data.to

	chatDefaults.from = from
	chatDefaults.between = [ from, to ]

	await admin.firestore().collection('chats').add({ ...data, ...chatDefaults})

	await admin.firestore.collection('users').doc(from).update({
		chattedWith: admin.firestore.FieldValue.arrayUnion(to)
	})
	await admin.firestore.collection('users').doc(to).update({
		chattedWith: admin.firestore.FieldValue.arrayUnion(from)
	})

	return true
})