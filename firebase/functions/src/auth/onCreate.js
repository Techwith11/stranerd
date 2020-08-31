const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { createCustomer } = require('../helpers/braintree')
const { subscribeToMailchimpList } = require( '../helpers/subscribeToMailchimpList')

module.exports = functions.auth.user().onCreate(async (user) => {
	await admin.auth().setCustomUserClaims(user.uid, { isStudent: true })

	const data = {
		bio: { email: user.email, image: {} },
		roles: { isStudent: true },
		dates:{ registeredAt: admin.firestore.FieldValue.serverTimestamp() },
		account: { questions: 5 }
	}

	if(user.displayName) data.bio.name = user.displayName
	if(user.photoURL) data.bio.image.link = user.photoURL

	try {
		const result = await createCustomer(user.displayName, user.email)
		if(result.success) data.account.customer_id = result.customer.id
	}catch(error){ console.log(error, user.uid,user.email) }

	try{
		await subscribeToMailchimpList(user.email)
	}catch (error) { console.log(error, user.uid, user.email) }

	await admin.firestore().collection('users').doc(user.uid)
		.set(data, { merge: true })
})