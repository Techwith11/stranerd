import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { deleteFromAlgolia } from '../../helpers/algolia'

export const firestorePostDeleted = functions.firestore.document('/posts/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('posts', snap.id)

	try{
		await admin.database().ref(`posts/${snap.id}`).remove()
	}catch(error){ console.warn(error) }
})
