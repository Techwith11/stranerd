import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'
import equal from 'deep-equal'
import { deleteFromStorage } from '../../helpers/storage'

export default functions.firestore.document('/users/{id}').onUpdate(async (snap) => {
	const { bio: oldBio, tutor: oldTutor } = snap.before.data()
	const { bio: newBio, tutor: newTutor } = snap.after.data()
	if(!equal(oldBio, newBio) || !equal(oldTutor, newTutor)){
		const data = { bio: newBio } as any
		if(snap.after.data().roles.isTutor) data.tutor = snap.after.data().tutor
		await saveToAlgolia('users', snap.after.id, data)
	}

	if(!equal(snap.before.data().bio.image, snap.after.data().bio.image)){
		await deleteFromStorage(snap.before.data().bio.image?.link)
	}
})
