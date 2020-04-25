const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/courses/{course}/discussions/{id}').onCreate(async (snap, context) => {
	let defaults = {
		dates: {
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		}
	}
	let id = context.params.id
	let ref = admin.firestore().collection('courses').doc(context.params.course).collection('discussions').doc(id)

	if(context.auth){
		defaults.userId = context.auth.uid
	}

	await ref.set(defaults, { merge: true })
})