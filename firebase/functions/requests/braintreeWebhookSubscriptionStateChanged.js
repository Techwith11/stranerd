const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')

let plans = {
	'stranerd_monthly_amateur_plan': 5, 'stranerd_monthly_intermediate_plan': 10, 'stranerd_monthly_master_plan': 15,
	'stranerd_yearly_amateur_plan': 60, 'stranerd_yearly_intermediate_plan': 120, 'stranerd_yearly_master_plan': 180
}

module.exports = functions.https.onRequest(async (request, response) => {
	try {
		let environment = functions.config().environment.mode
		let gateway = braintree.connect({
			environment: braintree.Environment[environment === 'production' ? 'Production' : 'Sandbox'],
			merchantId: functions.config().braintree[environment]['merchant_id'],
			publicKey: functions.config().braintree[environment]['public_key'],
			privateKey: functions.config().braintree[environment]['private_key']
		})
		let { bt_signature, bt_payload } = request.body
		let parsed = await gateway.webhookNotification.parse(bt_signature, bt_payload)
		let { subscription, kind } = parsed
		if(subscription){
			subscription = JSON.parse(JSON.stringify(subscription))
			let docs = await admin.firestore().collection('users').where('account.subscription.id','==', subscription.id).limit(1).get()
			if(!docs.size){ return response.json('No user with such subscription. Skipping web hook').end() }
			let account = { subscription }
			if(kind === 'subscription_charged_successfully'){
				let planId = subscription.planId || 'stranerd_monthly_amateur_plan'
				account.questions = plans[planId] || 5
			}
			await docs.docs[0].ref.set({ account }, { merge: true })
		}
		return response.json({ message: 'Updated successfully' }).end()
	}catch(error){
		return response.status(400).json({ error, message: 'Unknown error occurred'}).end()
	}
})