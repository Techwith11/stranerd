const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.auth.user().onCreate(user => {
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set({
			email: user.email,
			name: user.displayName,
			image: {
				link: user.photoURL
			},
			phone: user.phoneNumber
		})
	}
)