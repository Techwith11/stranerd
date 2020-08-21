const functions = require('firebase-functions')
const { saveToAlgolia } = require('../../helpers/algolia')

module.exports = functions.firestore.document('/posts/{id}').onCreate(async (snap) => {
	await saveToAlgolia('posts', snap.id, snap.data())
})
