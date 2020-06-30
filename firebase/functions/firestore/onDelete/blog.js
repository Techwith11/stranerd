const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/blog/{id}').onDelete(async (snap, context) => {
	try{
		await deleteFromStorage(snap.data().image.link)
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('blog')
		return await index.deleteObject(snap.id)
	}catch(error){
		return console.warn(error)
	}
})