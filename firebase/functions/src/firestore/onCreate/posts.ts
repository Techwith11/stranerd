import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export default functions.firestore.document('/posts/{id}').onCreate(async (snap) => {
	await saveToAlgolia('posts', snap.id, snap.data())
})
