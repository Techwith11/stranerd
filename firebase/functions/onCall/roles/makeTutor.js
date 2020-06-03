const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (functions.config().environment.mode === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upgrade accounts')
	}
	if (functions.config().environment.mode === 'production' && !context.auth.token.isAdmin) {
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can be upgrade users')
	}
	try{
		if(functions.config().environment.mode === 'production'){
			await admin.auth().setCustomUserClaims(data.id, { isTutor: true })
		}

		let ref = admin.firestore().collection('users').doc(data.id)

		let user = (await ref.get()).data()

		let upgrade = {}
		upgrade[data.course] = {}
		let levels = {}
		levels[data.course] = 0
		let qualifications = {}
		qualifications[data.course] = data.qualification
		let rating = user.roles.isTutor ? user.tutor.rating : 0
		let reviews = user.roles.isTutor ? user.tutor.reviews : 0
		let canTeach = user.roles.isTutor ? user.tutor.canTeach : false
		let courses = user.roles.isTutor ? [...user.tutor.courses, data.course] : [data.course]

		await ref.set({
			bio: { bio: data.bio },
			roles: { isTutor: true },
			tutor: { upgrade, levels, reviews, rating, canTeach, qualifications, courses }
		}, { merge: true })

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})