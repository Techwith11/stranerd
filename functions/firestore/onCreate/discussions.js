const functions = require('firebase-functions')
const admin = require('firebase-admin')

let discussionDefaults = { createdAt: Date.now(), updatedAt: null, savedBy: [] }

module.exports = functions.firestore.document('/courses/{courseId}/{discussions}/{id}').onCreate(async (snap, context) => {
	let courseId = context.params.courseId
	let id = context.params.id
	let discussionRef = admin.firestore().collection('courses').doc(courseId).collection('discussions').doc(id)

	discussionDefaults.userId = context.auth.uid

	await discussionRef.set(discussionDefaults,{ merge: true })
})