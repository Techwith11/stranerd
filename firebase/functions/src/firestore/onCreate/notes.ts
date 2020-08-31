import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export const firestoreNoteCreated = functions.firestore.document('/notes/{id}').onCreate(async (snap) => {
	await saveToAlgolia('notes', snap.id, snap.data())
})
