const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

module.exports = functions.firestore.document('/blog/{id}').onDelete(async (snap, context) => {
	try{
		/*admin.storage().bucket(snap.data().image.name).delete()*/
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('blog')
		index.deleteObject(snap.id)
	}catch(error){
		console.warn(error)
	}
})