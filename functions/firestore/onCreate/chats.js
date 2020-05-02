const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/chats/singles/{path}/{id}').onCreate(async (snap, context) => {
	let path = context.params.path
	path = path.split('_')

	await admin.firestore().collection('users').doc(path[0]).update({
		chattedWith: admin.firestore.FieldValue.arrayUnion(path[1])
	})

	await admin.firestore().collection('users').doc(path[1]).update({
		chattedWith: admin.firestore.FieldValue.arrayUnion(path[0])
	})
})