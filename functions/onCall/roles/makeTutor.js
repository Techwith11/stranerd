const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (process.env.NODE_ENV === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upgrade accounts')
	}
	if (process.env.NODE_ENV === 'production' && !context.auth.token.isAdmin) {
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can be upgrade users')
	}
	try{
		if(process.env.NODE_ENV === 'production'){
			await admin.auth().setCustomUserClaims(data.id, { isTutor: true })
		}

		let upgrade = {}
		upgrade[data.tutor.course] = {}
		let levels = {}
		levels[data.tutor.course] = 0

		await admin
			.firestore()
			.collection('users')
			.doc(data.id)
			.set({
				bio: data.bio,
				roles: { isTutor: true },
				tutor: {
					upgrade,
					levels,
					reviews: 0,
					rating: 0,
					canTeach: false,
					courses: [data.tutor.course],
					qualification: data.tutor.qualification
				}
			}, { merge: true })
		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})