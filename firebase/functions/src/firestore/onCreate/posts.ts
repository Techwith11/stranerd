import functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

module.exports = functions.firestore.document('/posts/{id}').onCreate(async (snap) => {
	await saveToAlgolia('posts', snap.id, snap.data())
})
