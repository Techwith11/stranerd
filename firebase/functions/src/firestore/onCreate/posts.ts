import * as functions from 'firebase-functions'
import { saveToAlgolia } from '../../helpers/algolia'
import { fetchTutorsList } from '../../helpers/database/tutorsList'
import { createNotification } from '../../helpers/database/notifications'

export const firestorePostCreated = functions.firestore.document('/posts/{id}').onCreate(async (snap) => {
	const post = snap.data()

	await saveToAlgolia('posts', snap.id, post)

	const notification = {
		title: `New ${post.subject} question: ${post.title}`,
		description: post.body,
		action: `/posts/${snap.id}`,
		type: 'info'
	}

	const tutors = await fetchTutorsList()
	const allPromises = tutors.map(async (tutor) => await createNotification(tutor.id, notification))
	await Promise.all(allPromises)

})
