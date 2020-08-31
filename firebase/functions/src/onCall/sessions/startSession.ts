import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export default functions.https.onCall(async ({ tutor, student, price, duration }, context) => {
	try{
		if (isProduction && !context.auth) {
			throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can start sessions')
		}

		const createdAt = admin.firestore.Timestamp.now()

		const tutorCurrentSessions = await admin.firestore().collection('sessions')
			.where('tutor','==', tutor)
			.where('dates.endedAt','>', createdAt)
			.limit(1)
			.get()
		if(!tutorCurrentSessions.empty){
			const session = tutorCurrentSessions.docs[0].data()
			const time = session.duration > 1 ? `${session.duration} hours` : `${session.duration} hour`
			throw new functions.https.HttpsError('failed-precondition',`Tutor is currently in a ${time} session. Try again later.`)
		}
		const docs = await admin.firestore().collection('sessions')
			.where('tutor','==', tutor)
			.where('cancelled.tutor','==', false)
			.where('cancelled.student','==', false)
			.where('paid','==', false)
			.limit(1)
			.get()
		if(!docs.empty){
			const session = docs.docs[0].data()
			const time = session.duration > 1 ? `${session.duration} hours` : `${session.duration} hour`
			throw new functions.https.HttpsError('failed-precondition',`Tutor is currently in a ${time} session. Try again later.`)
		}

		const session = {
			duration, student, tutor: tutor, price,
			accepted: false, paid: false,
			cancelled: { student: false, tutor: false },
			dates: { createdAt },
			reviews: {
				student: {},
				tutor: {}
			}
		}

		const doc = await admin.firestore().collection('sessions').add(session)

		return doc.id
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
