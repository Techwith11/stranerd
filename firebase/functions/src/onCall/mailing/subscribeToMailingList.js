const functions = require('firebase-functions')
const { subscribeToMailchimpList } = require('../../helpers/subscribeToMailchimpList')

module.exports = functions.https.onCall(async (data) => {
	let { email } = data
	try{
		return subscribeToMailchimpList(email)
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
