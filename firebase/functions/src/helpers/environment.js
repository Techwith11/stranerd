const functions = require('firebase-functions')

const isProduction = functions.config().environment.mode === 'production'
const isDev = functions.config().environment.mode === 'development'

module.exports.isProduction = isProduction
module.exports.isDev = isDev

const environment = isProduction ? 'production' : 'development'

module.exports.environmentVariables = {
	paypal: {
		clientId: functions.config().paypal[environment]['client_id']
	},
	braintree: {
		merchantId: functions.config().braintree[environment]['merchant_id'],
		publicKey: functions.config().braintree[environment]['public_key'],
		privateKey: functions.config().braintree[environment]['private_key']
	},
	algolia: {
		appId: functions.config().algolia[environment]['app_id'],
		apiKey: functions.config().algolia[environment]['api_key'],
	},
	mailchimp: {
		apiKey: functions.config().mailchimp['api_key']
	},

	admin: {
		meta: {
			domain: functions.config().admin[environment].meta['domain'],
		},
		email: {
			email: functions.config().admin[environment].email['email'],
			pass: functions.config().admin[environment].email['pass'],
		},
	}
}
