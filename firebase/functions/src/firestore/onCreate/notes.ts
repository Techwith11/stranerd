import functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export default functions.firestore.document('/notes/{id}').onCreate(async (snap) => {
	await saveToAlgolia('notes', snap.id, snap.data())
})
