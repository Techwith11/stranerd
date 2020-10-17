import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export const firestoreArticleCreated = functions.firestore.document('/blog/{id}').onCreate(async (snap) => {
	await saveToAlgolia('articles', snap.id, snap.data())
})
