const functions = require('firebase-functions')
const { saveToAlgolia } = require('../../helpers/algolia')

module.exports = functions.firestore.document('/posts/{id}').onUpdate(async (snap) => {
	await saveToAlgolia('posts', snap.after.id, snap.after.data())
})
