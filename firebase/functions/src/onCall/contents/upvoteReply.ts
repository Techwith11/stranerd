import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const upvoteReply = functions.https.onCall(async ({ id, user, post, reply }, context) => {
	if (isProduction() && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upvote replies')
	}

	if (id === user) {
		throw new functions.https.HttpsError('failed-precondition', 'You cannot upvote your own replies')
	}
	try{
		await admin.database().ref(`posts/${post}/replies/${reply}/votes/${id}`).set(true)

		const userRef = await admin.firestore().collection('users').doc(user)
		const userData = (await userRef.get()).data()
		if(userData?.roles?.isTutor){
			const { rating, reviews } = userData.tutor
			const overall = ((rating * reviews) + 5) / (reviews + 1)
			await userRef.set({
				tutor: {
					rating: parseFloat(overall.toFixed(2)),
					reviews: reviews + 1
				}
			}, { merge: true })
		}

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
