const functions = require('firebase-functions')
const { deleteFromAlgolia } = require('../../helpers/algolia')

module.exports = functions.firestore.document('/posts/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('posts', snap.id)
	try{
		const postReplies = await admin.firestore().collection('posts').doc(snap.id).collection('replies').get()
		//Delete votes as well as replies
		postReplies.docs.forEach(reply => reply.ref.delete())
	}catch(error){
		console.warn(error)
	}
})
