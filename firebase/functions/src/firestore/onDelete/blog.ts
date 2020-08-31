import * as functions from 'firebase-functions'
import { deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'

export default functions.firestore.document('/blog/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('articles', snap.id)

	await deleteFromStorage(snap.data().image.link)
})
