import { https } from 'firebase-functions'
import { firestore } from 'firebase-admin'
import { parseNotification } from '../helpers/braintree'

const plans = {
	'stranerd_monthly_amateur_plan': 5, 'stranerd_monthly_intermediate_plan': 10, 'stranerd_monthly_master_plan': 15,
	'stranerd_yearly_amateur_plan': 60, 'stranerd_yearly_intermediate_plan': 120, 'stranerd_yearly_master_plan': 180
}

module.exports = https.onRequest(async (request, response) => {
	try {
		const { subscription, kind } = await parseNotification(request.body)
		if(subscription){
			const subscriptionParsed = JSON.parse(JSON.stringify(subscription))

			const docs = await firestore().collection('users')
				.where('account.subscription.id','==', subscriptionParsed.id)
				.limit(1).get()
			if(!docs.size) response.json('No user with such subscription. Skipping web hook').end()

			const account = { subscription, questions: 0 }

			// @ts-ignore
			if(kind === 'subscription_charged_successfully') account.questions = plans[subscriptionParsed.planId] ?? 5

			await docs.docs[0]?.ref.set({ account }, { merge: true })
		}
		response.json({ message: 'Updated successfully' }).end()
	}catch(error){
		response.status(400).json({ error, message: 'Unknown error occurred'}).end()
	}
})
