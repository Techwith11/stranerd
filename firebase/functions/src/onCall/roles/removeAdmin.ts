import functions from 'firebase-functions'
import admin from'firebase-admin'
import { isProduction } from '../../helpers/environment'

export default functions.https.onCall(async ({ id }, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can upgrade accounts')
	}
	if (isProduction && !context.auth?.token.isAdmin) {
		throw new functions.https.HttpsError('failed-precondition', 'Only admins can downgrade users')
	}
	try{
		if (isProduction){
			await admin.auth().setCustomUserClaims(id, { isAdmin: false })
		}
		await admin
			.firestore()
			.collection('users')
			.doc(id)
			.set({
				roles: { isAdmin: false }
			}, { merge: true })
		return true
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
