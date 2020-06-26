const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const equal = require('deep-equal')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

module.exports = functions.firestore.document('/users/{id}').onUpdate(async (snap, context) => {
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('users')
		if(!equal(snap.before.data().bio, snap.after.data().bio) || !equal(snap.before.data().tutor, snap.after.data().tutor)){
			let bio = snap.after.data().bio
			let data = { objectId: snap.after.id, bio }
			if(snap.after.data().roles.isTutor){
				data['tutor'] = snap.after.data().tutor
			}
			await index.saveObject(data)
		}
	}catch(error){
		console.warn(error)
	}
})