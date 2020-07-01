const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]
const equal = require('deep-equal')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/notes/{id}').onUpdate(async (snap, context) => {
	try{
		if(!equal(snap.before.data().document, snap.after.data().document)){
			await deleteFromStorage(snap.before.data().document.link)
		}
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('notes')
		let data = { objectID: snap.after.id, ...snap.after.data() }
		return await index.saveObject(data)
	}catch(error){
		return console.warn(error)
	}
})