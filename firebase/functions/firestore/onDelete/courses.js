const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/courses/{id}').onDelete(async (snap, context) => {
	try{
		await deleteFromStorage(snap.data().video.link)
		await deleteFromStorage(snap.data().image.link)
		snap.data().documents.map(async document => await deleteFromStorage(document.link))

		let courseDiscussions = await admin.firestore().collection('courses').doc(snap.id).collection('discussions').get()
		courseDiscussions.docs.forEach(discussion => discussion.ref.delete())
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.app_id, algolia.api_key)
		const index = client.initIndex('posts')
		return index.deleteObject(snap.id)
	}catch(error){
		return console.warn(error)
	}
})