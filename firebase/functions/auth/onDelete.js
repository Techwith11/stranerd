const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.auth.user().onDelete(async (user) => {
	await admin.firestore().collection('users').doc(user.uid)
		.set({
			dates: { deletedAt: admin.firestore.FieldValue.serverTimestamp() },
		},{ merge: true })
})
