import * as functions from 'firebase-functions'

export const isProduction = () => functions.config().environment.mode === 'production'
export const isDev = () => functions.config().environment.mode === 'development'

const environment = () => isProduction() ? 'production' : 'development'

export const environmentVariables = {
	paypal: {
		clientId: functions.config().paypal[environment()]['client_id']
	},
	braintree: {
		merchantId: functions.config().braintree[environment()]['merchant_id'],
		publicKey: functions.config().braintree[environment()]['public_key'],
		privateKey: functions.config().braintree[environment()]['private_key']
	},
	algolia: {
		appId: functions.config().algolia[environment()]['app_id'],
		apiKey: functions.config().algolia[environment()]['api_key'],
	},
	mailchimp: {
		apiKey: functions.config().mailchimp['api_key']
	},

	admin: {
		meta: {
			domain: functions.config().admin[environment()].meta['domain'],
		},
		email: {
			email: functions.config().admin[environment()].email['email'],
			clientId: functions.config().admin[environment()].email['client_id'],
			clientSecret: functions.config().admin[environment()].email['client_secret'],
			refreshToken: functions.config().admin[environment()].email['refresh_token'],
			pass: functions.config().admin[environment()].email['pass'],
		},
	}
}
