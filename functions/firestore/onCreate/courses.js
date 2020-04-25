const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/courses/{id}').onCreate(async (snap, context) => {
	let courseDefaults = {
		dates: {
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		savedBy: []
	}
	let id = context.params.id
	let courseRef = admin.firestore().collection('courses').doc(id)

	if(context.auth){
		courseDefaults.userId = context.auth.uid
	}

	await courseRef.set(courseDefaults, { merge: true })
})