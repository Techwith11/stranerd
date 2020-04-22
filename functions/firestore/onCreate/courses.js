const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/courses/{id}').onCreate(async (snap, context) => {
	let courseDefaults = {
		dates: {
			createdAt: new Date(),
			updatedAt: null
		},
		savedBy: []
	}
	let id = context.params.id
	let courseRef = admin.firestore().collection('courses').doc(id)

	courseDefaults.userId = context.auth.uid

	await courseRef.set(courseDefaults, { merge: true })
})