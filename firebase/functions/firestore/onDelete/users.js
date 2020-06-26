const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

module.exports = functions.firestore.document('/users/{id}').onDelete(async (snap, context) => {
	try{
		/*admin.storage().bucket(snap.data().bio.image.name).delete()*/

		let paymentMethods = await admin.firestore().collection('users').doc(snap.id).collection('paymentMethods').get()
		paymentMethods.docs.forEach(paymentMethod => paymentMethod.ref.delete())
		let transactions = await admin.firestore().collection('users').doc(snap.id).collection('transactions').get()
		transactions.docs.forEach(transaction => transaction.ref.delete())
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('users')
		index.deleteObject(snap.id)
	}catch(error){
		console.warn(error)
	}
})