const functions = require('firebase-functions')
const equal = require('deep-equal')
const { saveToAlgolia } = require('../../helpers/algolia')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/courses/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('courses', snap.after.id, snap.after.data())

	if(!equal(snap.before.data().image, snap.after.data().image)){
		await deleteFromStorage(snap.before.data().image.link)
	}
	if(!equal(snap.before.data().video, snap.after.data().video)){
		await deleteFromStorage(snap.before.data().video?.link)
	}
	const oldDocuments = snap.before.data().documents
	const newDocuments = snap.after.data().documents
	oldDocuments.map(async document => {
		const wasNotRemoved = newDocuments.find(doc => equal(doc, document))
		if(!wasNotRemoved){
			await deleteFromStorage(document.link)
		}
	})
})
