const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/sessions/{id}').onCreate(async (snap, context) => {
	let sessionDefaults = { createdAt: admin.firestore.FieldValue.serverTimestamp() }
	let id = context.params.id
	let sessionRef = admin.firestore().collection('sessions').doc(id)

	await sessionRef.set(sessionDefaults,{ merge: true })
})