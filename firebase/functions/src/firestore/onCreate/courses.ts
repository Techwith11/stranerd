import functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export default functions.firestore.document('/courses/{id}').onCreate(async (snap) => {
	await saveToAlgolia('courses', snap.id, snap.data())
})
