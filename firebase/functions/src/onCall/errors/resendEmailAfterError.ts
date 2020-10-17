import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { sendMail } from '../../helpers/email'

export const resendEmailAfterError = functions.https.onCall(async ({ id }) => {
	const ref = admin.database().ref('errors/emails').child(id)
	const doc = await ref.once('value')
	if(!doc.exists) return true
	const { subject, to, content } = doc.val()!
	try{
		await sendMail(to, subject, content)
		await ref.remove()
		return true
	}catch(e) {
		await ref.set({
			'dates/triedAt': admin.database.ServerValue.TIMESTAMP,
			'error': e.message
		})
		return false
	}
})
