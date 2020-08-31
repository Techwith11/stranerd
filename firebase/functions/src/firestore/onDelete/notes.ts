import * as functions from 'firebase-functions'
import { deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'

export default functions.firestore.document('/notes/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('notes', snap.id)

	await deleteFromStorage(snap.data().document.link)
	await deleteFromStorage(snap.data().image.link)
})
