import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'
const equal = require('deep-equal')

export const firestoreNoteUpdated = functions.firestore.document('/notes/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('notes', snap.after.id, snap.after.data())

	if(!equal(snap.before.data().document, snap.after.data().document)){
		await deleteFromStorage(snap.before.data().document?.link)
	}
	if(!equal(snap.before.data().image, snap.after.data().image)){
		await deleteFromStorage(snap.before.data().image?.link)
	}
})
