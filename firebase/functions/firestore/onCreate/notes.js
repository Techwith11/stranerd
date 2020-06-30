const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

module.exports = functions.firestore.document('/notes/{id}').onCreate(async (snap, context) => {
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('notes')
		let data = { objectId: snap.id, ...snap.data() }
		return await index.saveObject(data)
	}catch(error){
		return console.warn(error)
	}
})