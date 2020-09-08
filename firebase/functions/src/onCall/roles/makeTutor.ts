import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const makeTutor = functions.https.onCall(async ({ id, course }, context) => {
	if (isProduction() && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upgrade accounts')
	}
	if (isProduction() && !context.auth?.token.isAdmin) {
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can be upgrade users')
	}
	try{
		if(isProduction()){
			await admin.auth().setCustomUserClaims(id, { isTutor: true })
		}

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
		}else{
			throw new functions.https.HttpsError('unknown', `${user.bio.name} is already a ${course} tutor`)
		}

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
