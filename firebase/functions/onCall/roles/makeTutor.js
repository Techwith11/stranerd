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

		if(!user.tutor?.courses.includes(data.course)){
			let upgrade = { [data.course]: {} }
			let levels = { [data.course]: 0 }
			let rating = user.tutor?.rating ?? 0
			let reviews = user.tutor?.reviews ?? 0
			let canTeach = user.tutor?.canTeach ?? false
			let courses = [...(user.tutor?.courses ?? []), data.course]

			await ref.set({
				roles: { isTutor: true },
				tutor: { upgrade, levels, reviews, rating, canTeach, courses }
			}, { merge: true })
		}else{
			throw new functions.https.HttpsError('unknown', `${user.bio.name} is already a ${data.course} tutor`)
		}

		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
