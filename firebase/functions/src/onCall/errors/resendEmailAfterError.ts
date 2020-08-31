import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { sendMail } from '../../helpers/email'

export default functions.https.onCall(async ({ id }) => {
	const ref = admin.firestore().collection('errors/types/emails').doc(id)
	const doc = await ref.get()
	if(!doc.exists) return true
	const { subject, to, content } = doc.data()!
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
