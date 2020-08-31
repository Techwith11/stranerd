const functions = require('firebase-functions')
const equal = require('deep-equal')
const { saveToAlgolia } = require('../../helpers/algolia')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/blog/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('articles', snap.after.id, snap.after.data())

	if(!equal(snap.before.data().image, snap.after.data().image)){
		await deleteFromStorage(snap.before.data().image.link)
	}
})
