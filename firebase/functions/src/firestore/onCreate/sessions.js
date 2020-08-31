const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { sendSessionRequestEmail } = require('../../helpers/email')

module.exports = functions.firestore.document('/sessions/{id}').onCreate(async (snap) => {
	const { student, tutor, duration } = snap.data()

	const timeFormatted = duration < 1 ? `${duration} minutes` : `${duration} ${duration === 1 ? 'hour': 'hours'}`

	let doc = await admin.firestore().collection('users').doc(tutor).get()
	const tutorEmail = doc.data()?.bio?.email ?? ''
	doc = await admin.firestore().collection('users').doc(student).get()

	const studentBio = doc.data()?.bio ?? { name: '' }

	return await sendSessionRequestEmail(tutorEmail, studentBio, timeFormatted)
})
