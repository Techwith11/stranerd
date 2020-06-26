const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

module.exports = functions.firestore.document('/users/{id}').onCreate(async (snap, context) => {
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('users')
		let bio = snap.data().bio
		let data = { objectId: snap.id, bio }
		if(snap.data().roles.isTutor){
			data['tutor'] = snap.data().tutor
		}
		index.saveObject(data)
	}catch(error){
		console.warn(error)
	}
})