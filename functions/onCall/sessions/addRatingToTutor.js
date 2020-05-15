const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (process.env.NODE_ENV === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can rate tutors')
	}

	let ref = admin.firestore().collection('users').doc(data.tutor)

	let tutor = (await ref.get()).data().tutor
	let rating = tutor.rating
	let length = tutor.reviews

	let overall = Number(Number((rating * length + data.review.rating) / (length + 1)).toFixed(2))

	return await ref.set({
		tutor: { reviews: length + 1, rating: overall },
	}, { merge: true })
})