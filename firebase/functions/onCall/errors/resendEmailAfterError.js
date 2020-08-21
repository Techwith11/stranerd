const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { sendMail } = require('../../emails/index')

module.exports = functions.https.onCall(async (data) => {
	const { id } = data
	const ref = admin.firestore().collection('errors/types/emails').doc(id)
	const doc = await ref.get()
	if(!doc.exists) return true
	const { subject, to, content } = doc.data()
	try{
		await sendMail(to, subject, content)
		return true
	}catch(e) {
		await ref.set({
			dates: { triedAt: admin.firestore.FieldValue.serverTimestamp() },
			error: e.message
		}, { merge: true })
		return false
	}
})
