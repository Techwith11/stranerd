const functions = require('firebase-functions')
const algoliaSearch = require('algoliasearch')
const environment = functions.config().environment.mode
const algolia = functions.config().algolia[environment]

module.exports = functions.firestore.document('/posts/{id}').onDelete(async (snap, context) => {
	try{
		let postReplies = await admin.firestore().collection('posts').doc(snap.id).collection('replies').get()
		postReplies.docs.forEach(reply => reply.ref.delete())
	}catch(error){
		console.warn(error)
	}
	try{
		const client = algoliaSearch(algolia.appId, algolia.apiKey)
		const index = client.initIndex('posts')
		index.deleteObject(snap.id)
	}catch(error){
		console.warn(error)
	}
})