import functions from 'firebase-functions'
import admin from 'firebase-admin'
import { deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'

export default functions.firestore.document('/courses/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('courses', snap.id)

	await deleteFromStorage(snap.data().video.link)
	await deleteFromStorage(snap.data().image.link)
	snap.data().documents.map(async (document: any) => await deleteFromStorage(document.link))

	try{
		const courseDiscussions = await admin.firestore().collection('courses').doc(snap.id).collection('discussions').get()
		courseDiscussions.docs.forEach(discussion => discussion.ref.delete())
	}catch(error){
		console.warn(error)
	}
})
