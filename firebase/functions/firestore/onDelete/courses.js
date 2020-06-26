const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

module.exports = functions.firestore.document('/courses/{id}').onDelete(async (snap, context) => {
	try{
		/*admin.storage().bucket(snap.data().video.name).delete()
		admin.storage().bucket(snap.data().image.name).delete()
		snap.data().documents.forEach(document => admin.storage().bucket(document.name).delete())*/

		let courseDiscussions = await admin.firestore().collection('courses').doc(snap.id).collection('discussions').get()
		courseDiscussions.docs.forEach(discussion => discussion.ref.delete())
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.appId, algolia.apiKey)
		const index = client.initIndex('posts')
		return index.deleteObject(snap.id)
	}catch(error){
		return console.warn(error)
	}
})