const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (functions.config().environment.mode === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upvote replies')
	}
	let { id, user, post, reply } = data
	if(functions.config().environment.mode === 'production'){ id = context.auth.uid }
	if (id === user) {
		throw new functions.https.HttpsError('failed-precondition', 'You cannot upvote your own replies')
	}

	await admin.firestore().doc(`posts/${post}/replies/${reply}/votes/votes`).set({ votes: admin.firestore.FieldValue.arrayUnion(id) }, { merge: true })

	let userRef = await admin.firestore().collection('users').doc(user)
	let userData = (await userRef.get()).data()
	if(userData.roles.isTutor){
		let { ratings, reviews } = userData.tutor
		let overall = ((ratings * reviews) + 5) / (reviews + 1)
		await userRef.set({
			tutor: {
				ratings: parseFloat(overall.toFixed(2)),
				reviews: reviews + 1
			}
		}, { merge: true })
	}

	return true
})