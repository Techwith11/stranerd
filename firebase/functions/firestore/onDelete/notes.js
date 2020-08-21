const functions = require('firebase-functions')
const { deleteFromAlgolia } = require('../../helpers/algolia')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/notes/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('notes', snap.id)

	await deleteFromStorage(snap.data().document.link)
})
