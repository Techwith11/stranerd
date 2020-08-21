const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { deleteFromAlgolia } = require('../../helpers/algolia')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/courses/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('courses', snap.id)

	await deleteFromStorage(snap.data().video.link)
	await deleteFromStorage(snap.data().image.link)
	snap.data().documents.map(async document => await deleteFromStorage(document.link))

	try{
		const courseDiscussions = await admin.firestore().collection('courses').doc(snap.id).collection('discussions').get()
		courseDiscussions.docs.forEach(discussion => discussion.ref.delete())
	}catch(error){
		console.warn(error)
	}
})
