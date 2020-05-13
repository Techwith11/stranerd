const functions = require('firebase-functions')
const admin = require('firebase-admin')
const braintree = require('braintree')

module.exports = functions.auth.user().onCreate(async (user) => {
	await admin.auth().setCustomUserClaims(user.uid, {
		isStudent: true
	})
	let data = {
		bio: {
			email: user.email,
			name: user.displayName,
			image: {
				link: user.photoURL,
			}
		},
		roles: { isStudent: true },
		dates:{
			registeredAt: admin.firestore.FieldValue.serverTimestamp()
		},
		status: {
			online: true,
			lastSeen: admin.firestore.FieldValue.serverTimestamp()
		},
		account: {
			type: 'free'
		}
	}
	try {
		let gateway = new braintree.BraintreeGateway({
			environment: braintree.Environment.Sandbox,
			merchantId: '6f9mkyr3h4k9gvjk',
			publicKey: 'c57yb9sm9fc79c9x',
			privateKey: 'bb26a3a051b5d1da5f430872c820f616',
		})
		let result = await gateway.customer.create({
			firstName: user.displayName,
			email: user.email,
		})
		if(result.success){
			data.account.customer_id = result.customer.id
		}
	}catch(error){
		console.log(error)
	}
	return admin
		.firestore()
		.collection('users')
		.doc(user.uid)
		.set(data, { merge: true })
})
