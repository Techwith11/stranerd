import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export const firestorePostCreated = functions.firestore.document('/posts/{id}').onCreate(async (snap) => {
	await saveToAlgolia('posts', snap.id, snap.data())
})
