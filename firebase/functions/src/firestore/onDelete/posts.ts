import functions from 'firebase-functions'
import admin from 'firebase-admin'
import { deleteFromAlgolia } from '../../helpers/algolia'

export default functions.firestore.document('/posts/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('posts', snap.id)

	try{
		await admin.database().ref(`posts/${snap.id}`).remove()
	}catch(error){ console.warn(error) }
})
