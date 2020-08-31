import functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

module.exports = functions.firestore.document('/blog/{id}').onCreate(async (snap) => {
	await saveToAlgolia('articles', snap.id, snap.data())
})
