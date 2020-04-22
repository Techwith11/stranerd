const functions = require('firebase-functions')
const admin = require('firebase-admin')

let chatDefaults = {
	sentAt: new Date(), readAt: null
}

module.exports = functions.firestore.document('/{chats}/{id}').onCreate(async (snap, context) => {
	let id = context.params.id
	let chatRef = admin.firestore().collection('chats').doc(id)
	let fromId = context.auth.uid
	let toId = snap.data().to

	chatDefaults.from = fromId

	await chatRef.update(chatDefaults)

	await admin.firestore.collection('users').doc(fromId).update({
		chattedWith: admin.firestore.FieldValue.arrayUnion(toId)
	})
	await admin.firestore.collection('users').doc(toId).update({
		chattedWith: admin.firestore.FieldValue.arrayUnion(fromId)
	})
})