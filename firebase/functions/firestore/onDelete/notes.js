const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

module.exports = functions.firestore.document('/notes/{id}').onDelete(async (snap, context) => {
	try{
		/*admin.storage().bucket(snap.data().document.name).delete()*/
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.appId, algolia.apiKey)
		const index = client.initIndex('notes')
		index.deleteObject(snap.id)
	}catch(error){
		console.warn(error)
	}
})