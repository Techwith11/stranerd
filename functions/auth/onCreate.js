const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.auth.user().onCreate((user) => {
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set({
			bio: {
				email: user.email,
				name: user.displayName,
				image: {
					link: user.photoURL,
				},
				roles: { isStudent: true }
			},
			dates:{
				registeredAt: Date.now()
			},
			status: {
				active: true,
				lastSeen: null
			},
			premium: false,
		}, { merge: true })
})
