import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const addRatingToTutor = functions.https.onCall(async ({ tutor, review }, context) => {
	if (isProduction() && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can rate tutors')
	}
	try{
		const ref = admin.firestore().collection('users').doc(tutor)

		const tutorDoc = (await ref.get()).data()?.tutor ?? {}
		const rating = Number(tutorDoc.rating) ?? 0
		const length = Number(tutorDoc.reviews) ?? 0

		const totalRating = rating * length + review.rating
		const totalCount = length + 1
		const average = Number(totalRating / totalCount).toFixed(2)

		return await ref.set({
			tutor: { reviews: totalCount, rating: average },
		}, { merge: true })
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
