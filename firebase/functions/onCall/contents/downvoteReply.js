const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	try{
		if (isProduction && !context.auth) throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can downvote replies')
		let { id, user, post, reply } = data
		if(isProduction) id = context.auth.uid
		if (id === user) throw new functions.https.HttpsError('failed-precondition', 'You cannot downvote your own replies')

		await admin.database().ref(`posts/${post}/replies/${reply}/votes/${id}`).set(false)

		let userRef = await admin.firestore().collection('users').doc(user)
		let userData = (await userRef.get()).data()
		if(userData.roles.isTutor){
			let { rating, reviews } = userData.tutor
			let overall = ((rating * reviews) - 5) / (reviews - 1)
			await userRef.set({
				tutor: {
					rating: parseFloat(overall.toFixed(2)),
					reviews: reviews - 1
				}
			}, { merge: true })
		}

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
