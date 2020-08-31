import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export const firestorePostUpdated = functions.firestore.document('/posts/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('posts', snap.after.id, snap.after.data())
})
