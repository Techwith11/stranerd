const functions = require('firebase-functions')
const { saveToAlgolia } = require('../../helpers/algolia')

module.exports = functions.firestore.document('/courses/{id}').onCreate(async (snap) => {
	await saveToAlgolia('courses', snap.id, snap.data())
})
