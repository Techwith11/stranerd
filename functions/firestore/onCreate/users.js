const functions = require('firebase-functions')
const admin = require('firebase-admin')

let userDefaults = {
	roles: { isStudent: true },
	registeredAt: Date.now(), deactivatedAt: null, deletedAt: null,
	active: true, premium: false,
	chattedWith: []
}

module.exports = functions.firestore.document('/{users}/{id}').onCreate(async (snap, context) => {
	let id = context.params.id
	let userRef = admin.firestore().collection('users').doc(id)

	if(!snap.data().image){ userDefaults.image = null }

	await userRef.set(userDefaults,{ merge: true })
})