import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'
const equal = require('deep-equal')

export const firestoreCourseUpdated = functions.firestore.document('/courses/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('courses', snap.after.id, snap.after.data())

	if(!equal(snap.before.data().image, snap.after.data().image)){
		await deleteFromStorage(snap.before.data().image?.path)
	}
	if(!equal(snap.before.data().video, snap.after.data().video)){
		await deleteFromStorage(snap.before.data().video?.path)
	}
	const oldDocuments = snap.before.data().documents as any[]
	const newDocuments = snap.after.data().documents as any[]
	oldDocuments.map(async document => {
		const wasNotRemoved = newDocuments.find(doc => equal(doc, document))
		if(!wasNotRemoved) await deleteFromStorage(document?.path)
	})
})
