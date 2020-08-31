import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'

export const firestoreUserCreated = functions.firestore.document('/users/{id}').onCreate(async (snap) => {
	const data: any = { bio: snap.data().bio }
	if(snap.data().roles.isTutor) data.tutor = snap.data().tutor
	await saveToAlgolia('users', snap.id, data)
})
