import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'

export const firestoreCourseDeleted = functions.firestore.document('/courses/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('courses', snap.id)

	await deleteFromStorage(snap.data().video?.link)
	await deleteFromStorage(snap.data().image?.link)
	snap.data().documents.map(async (document: any) => await deleteFromStorage(document?.link))

	try{
		await admin.database().ref(`courses/${snap.id}`).remove()
	}catch(error){
		console.warn(error)
	}
})
