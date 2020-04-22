const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/courses/{id}').onUpdate(async (snap, context) => {
	if(snap.before.data().updatedAt === snap.after.data().updatedAt){
		let courseRef = admin.firestore().collection('courses').doc(context.params.id)
		await courseRef.update({
			updatedAt: new Date()
		})
	}
})