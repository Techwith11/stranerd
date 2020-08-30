const functions = require('firebase-functions')
const { deleteFromAlgolia } = require('../../helpers/algolia')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/blog/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('articles', snap.id)

	await deleteFromStorage(snap.data().image.link)
})
