const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.auth.user().onCreate(async (user) => {
	await admin.auth().setCustomUserClaims(user.uid, {
		isStudent: true
	})
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
				registeredAt: new Date()
			},
			status: {
				active: true,
				lastSeen: null
			},
			premium: false,
		}, { merge: true })
})
