import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'
import { sendSessionRequestEmail } from '../../helpers/email'

export const startSession = functions.https.onCall(async ({ tutor, student, price, duration }, context) => {
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

	try{
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

		const tutorDoc = await admin.firestore().collection('users').doc(tutor).get()
		const studentDoc = await admin.firestore().collection('users').doc(student).get()
		const tutorEmail = tutorDoc.data()?.bio?.email ?? ''
		const studentBio = studentDoc.data()?.bio ?? { name: '' }
		const timeFormatted = duration < 1 ? `${duration * 60} minutes` : `${duration} ${duration === 1 ? 'hour': 'hours'}`

		await sendSessionRequestEmail(tutorEmail, studentBio, timeFormatted)

		return doc.id
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
