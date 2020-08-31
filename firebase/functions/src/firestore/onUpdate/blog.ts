import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'
import equal from 'deep-equal'
import { deleteFromStorage } from '../../helpers/storage'

export default functions.firestore.document('/blog/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('articles', snap.after.id, snap.after.data())

	if(!equal(snap.before.data().image, snap.after.data().image)){
		await deleteFromStorage(snap.before.data().image.link)
	}
})
