const functions = require('firebase-functions')
const { saveToAlgolia } = require('../../helpers/algolia')

module.exports = functions.firestore.document('/notes/{id}').onCreate(async (snap) => {
	await saveToAlgolia('notes', snap.id, snap.data())
})
