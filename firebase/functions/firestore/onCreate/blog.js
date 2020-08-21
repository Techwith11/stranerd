const functions = require('firebase-functions')
const { saveToAlgolia } = require('../../helpers/algolia')

module.exports = functions.firestore.document('/blog/{id}').onCreate(async (snap) => {
	await saveToAlgolia('blog', snap.id, snap.data())
})
