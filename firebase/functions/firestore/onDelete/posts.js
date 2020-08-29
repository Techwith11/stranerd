const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { deleteFromAlgolia } = require('../../helpers/algolia')

module.exports = functions.firestore.document('/posts/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('posts', snap.id)

	try{
		await admin.database().ref(`posts/${snap.id}`).remove()
	}catch(error){ console.warn(error) }
})
