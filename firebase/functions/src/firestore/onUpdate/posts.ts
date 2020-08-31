import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export default functions.firestore.document('/posts/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('posts', snap.after.id, snap.after.data())
})
