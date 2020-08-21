const functions = require('firebase-functions')
const admin = require('firebase-admin')
const mailer = require('../../emails/index')

module.exports = functions.https.onCall(async (data) => {
	const { id } = data
	const ref = admin.firestore().collection('errors/types/emails').doc(id)
	const doc = await ref.get()
	if(!doc.exists) return true
	const { subject, to, content } = doc.data()
	try{
		await mailer.sendMail(to, subject, content)
		return true
	}catch {
		await ref.set({
			dates: { triedAt: admin.firestore.FieldValue.serverTimestamp() }
		}, { merge: true })
		return false
	}
})
