const functions = require('firebase-functions')
const axios = require('axios')

module.exports = functions.https.onCall(async (data, context) => {
	let { email } = data

	let body = {
		members: [
			{ email_address: email, status: 'subscribed' }
		]
	}
	let bodyJSON = JSON.stringify(body)
	let url = 'https://us10.api.mailchimp.com/3.0/lists/f630d749d7'
	let apiKey = functions.config().mailchimp.api_key

	try{
		await axios.post(url, bodyJSON, { headers: { Authorization: `auth ${apiKey}` } })
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}

	return true
})
