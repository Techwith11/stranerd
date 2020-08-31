const functions = require('firebase-functions')
const equal = require('deep-equal')
const { saveToAlgolia } = require('../../helpers/algolia')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/notes/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('notes', snap.after.id, snap.after.data())

	if(!equal(snap.before.data().document, snap.after.data().document)){
		await deleteFromStorage(snap.before.data().document.link)
	}
	if(!equal(snap.before.data().image, snap.after.data().image)){
		await deleteFromStorage(snap.before.data().image.link)
	}
})
