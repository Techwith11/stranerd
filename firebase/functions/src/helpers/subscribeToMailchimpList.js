const axios = require('axios')
const { environmentVariables } = require('./environment')

module.exports.subscribeToMailchimpList = async (email) => {
	const body = {
		members: [
			{ email_address: email, status: 'subscribed' }
		]
	}
	const bodyJSON = JSON.stringify(body)
	const url = 'https://us10.api.mailchimp.com/3.0/lists/f630d749d7'
	const apiKey = environmentVariables.mailchimp.apiKey

	try{
		return await axios.post(url, bodyJSON, { headers: { Authorization: `auth ${apiKey}` } })
	}catch(error){
		throw new Error(error.message)
	}
}
