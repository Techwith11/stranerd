import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export default functions.https.onCall(async ({ id }, context) => {
	try{
		if (isProduction && !context.auth) {
			throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can pay for sessions')
		}

		const ref = admin.firestore().collection('sessions').doc(id)

		const session = (await ref.get()).data()

		if (isProduction && context.auth && context.auth.uid !== session?.student) {
			throw new functions.https.HttpsError('failed-precondition', 'Only the student of the session can pay for it')
		}

		const endedAt = admin.firestore.Timestamp.now().toDate()
		endedAt.setMinutes(endedAt.getMinutes() + 60 * (session?.duration ?? 0))

		return await ref.set({ dates: { endedAt }, paid: true }, { merge: true })
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
