const functions = require('firebase-functions')
const admin = require('firebase-admin')

let courseDefaults = { createdAt: Date.now(), updatedAt: null, savedBy: [] }

module.exports = functions.firestore.document('/{courses}/{id}').onCreate((snap, context) => {
	let id = context.params.id
	let courseRef = admin.firestore().collection('courses').doc(id)

	courseDefaults.userId = context.auth.uid

	return courseRef.set(courseDefaults,{ merge: true })
})