const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	try{
		if (isProduction && !context.auth) {
			throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can rate tutors')
		}

		let ref = admin.firestore().collection('users').doc(data.tutor)

		let tutor = (await ref.get()).data().tutor
		let rating = Number(tutor.rating) ?? 0
		let length = Number(tutor.reviews) ?? 0

		let totalRating = rating * length + data.review.rating
		let totalCount = length + 1
		let average = Number(totalRating / totalCount).toFixed(2)

		return await ref.set({
			tutor: { reviews: totalCount, rating: average },
		}, { merge: true })
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
