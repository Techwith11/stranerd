import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { isProduction } from '../../helpers/environment'
import { addToTutorsList } from '../../helpers/database/tutorsList'

export const makeTutor = functions.https.onCall(async ({ id, course }, context) => {
	if (isProduction() && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upgrade accounts')
	}
	if (isProduction() && !context.auth?.token.isAdmin) {
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can be upgrade users')
	}
	try{
		const ref = admin.firestore().collection('users').doc(id)

		const user = (await ref.get()).data() as any

		if(!user.tutor?.courses.includes(course)){
			const upgrade = { [course]: {} }
			const levels = { [course]: 0 }
			const rating = user.tutor?.rating ?? 0
			const reviews = user.tutor?.reviews ?? 0
			const canTeach = user.tutor?.canTeach ?? false
			const courses = [...(user.tutor?.courses ?? []), course]

			await ref.set({
				roles: { isTutor: true },
				tutor: { upgrade, levels, reviews, rating, canTeach, courses }
			}, { merge: true })

			await addToTutorsList(id, { email: user.bio.email, courses  })
		}else{
			throw new functions.https.HttpsError('unknown', `${user.bio.name} is already a ${course} tutor`)
		}

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
