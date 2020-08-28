const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')
const { subscribeToMailchimpList } = require( '../helpers/subscribeToMailchimpList')

module.exports = functions.auth.user().onCreate(async (user) => {
	await admin.auth().setCustomUserClaims(user.uid, {
		isStudent: true
	})
	let data = {
		bio: {
			email: user.email,
			image: {}
		},
		roles: { isStudent: true },
		dates:{
			registeredAt: admin.firestore.FieldValue.serverTimestamp()
		},
		account: {
			questions: 3
		}
	}
	if(user.displayName){ data.bio.name = user.displayName }
	if(user.photoURL){ data.bio.image.link = user.photoURL }
	try {
		let environment = functions.config().environment.mode
		let gateway = braintree.connect({
			environment: braintree.Environment[environment === 'production' ? 'Production' : 'Sandbox'],
			merchantId: functions.config().braintree[environment]['merchant_id'],
			publicKey: functions.config().braintree[environment]['public_key'],
			privateKey: functions.config().braintree[environment]['private_key']
		})
		let result = await gateway.customer.create({
			firstName: user.displayName,
			email: user.email,
		})
		if(result.success){
			data.account.customer_id = result.customer.id
		}
	}catch(error){
		console.log(error, user.uid,user.email)
	}
	try{
		await subscribeToMailchimpList(user.email)
	}catch (error) {
		console.log(error, user.uid, user.email)
	}
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set(data, { merge: true })
})
