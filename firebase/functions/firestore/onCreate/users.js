const functions = require('firebase-functions')
const { saveToAlgolia } = require('../../helpers/algolia')

module.exports = functions.firestore.document('/users/{id}').onCreate(async (snap) => {
	const data = { bio: snap.data().bio }
	if(snap.data().roles.isTutor){
		data.tutor = snap.data().tutor
	}
	await saveToAlgolia('users', snap.id, data)
})
