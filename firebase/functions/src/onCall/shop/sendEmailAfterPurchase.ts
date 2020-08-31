import * as functions from 'firebase-functions'
import * as admin from'firebase-admin'
import { isProduction } from '../../helpers/environment'
import { sendPurchaseEmail } from '../../helpers/email'

export const sendEmailAfterPurchase = functions.https.onCall(async ({ id, cart }, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can receive purchase emails')
	}
	try{
		const user = (await admin.firestore().collection('users').doc(id).get()).data()
		const email = user?.bio?.email ?? ''
		return await sendPurchaseEmail(email, user?.bio ?? { name: '' }, cart)
	}catch(error){ throw new functions.https.HttpsError('unknown', error.message) }
})
