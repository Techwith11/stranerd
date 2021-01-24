import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'

export const makeAdmin = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upgrade accounts')
	}
	if (!context.auth?.token.isAdmin) {
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can upgrade users')
	}
	try{
		await admin.auth().setCustomUserClaims(data.id, { isAdmin: true })
		await admin
			.firestore()
			.collection('users')
			.doc(data.id)
			.set({
				roles: { isAdmin: true }
			}, { merge: true })
		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
