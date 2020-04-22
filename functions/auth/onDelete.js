const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.auth.user().onDelete((user) => {
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set({
			dates: {
				deletedAt: new Date(),
			},
		},{ merge: true })
})
