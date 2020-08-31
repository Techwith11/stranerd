import functions from 'firebase-functions'
import admin from 'firebase-admin'
import { sendSessionRequestEmail } from '../../helpers/email'

module.exports = functions.firestore.document('/sessions/{id}').onCreate(async (snap) => {
	const { student, tutor, duration } = snap.data()

	const timeFormatted = duration < 1 ? `${duration} minutes` : `${duration} ${duration === 1 ? 'hour': 'hours'}`

	const tutorDoc = await admin.firestore().collection('users').doc(tutor).get()
	const tutorEmail = tutorDoc.data()?.bio?.email ?? ''

	const studentDoc = await admin.firestore().collection('users').doc(student).get()

	const studentBio = studentDoc.data()?.bio ?? { name: '' }

	return await sendSessionRequestEmail(tutorEmail, studentBio, timeFormatted)
})
