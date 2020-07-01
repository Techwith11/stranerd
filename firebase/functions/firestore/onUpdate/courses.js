const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]
const equal = require('deep-equal')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/courses/{id}').onUpdate(async (snap, context) => {
	try{
		if(!equal(snap.before.data().image, snap.after.data().image)){
			await deleteFromStorage(snap.before.data().image.link)
		}
		if(!equal(snap.before.data().video, snap.after.data().video)){
			await deleteFromStorage(snap.before.data().video && snap.before.data().video.link)
		}
		let oldDocuments = snap.before.data().documents
		let newDocuments = snap.after.data().documents
		oldDocuments.map(async document => {
			let wasNotRemoved = newDocuments.find(doc => equal(doc, document))
			if(!wasNotRemoved){
				await deleteFromStorage(document.link)
			}
		})
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('courses')
		let data = { objectID: snap.after.id, ...snap.after.data() }
		return index.saveObject(data)
	}catch(error){
		return console.warn(error)
	}
})