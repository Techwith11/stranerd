const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/courses/{id}').onDelete(async (snap, context) => {
	let id = context.params.id

	admin.storage().bucket(snap.data().video.name).delete()
	admin.storage().bucket(snap.data().image.name).delete()
	if(snap.data().isPreview){
		admin.storage().bucket(snap.data().video.name).delete()
	}
	snap.data().documents.forEach(document => admin.storage().bucket(document.name).delete())

	let courseDiscussions = await admin.firestore().collection('courses').doc(id).collection('discussions').get()
	courseDiscussions.docs.forEach(discussion => discussion.ref.delete())
})