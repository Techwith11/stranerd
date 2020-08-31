import functions from 'firebase-functions'
import { subscribeToMailchimpList } from '../../helpers/subscribeToMailchimpList'

module.exports = functions.https.onCall(async ({ email }) => {
	try{
		await subscribeToMailchimpList(email)
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
