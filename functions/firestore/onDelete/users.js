const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/users/{id}').onDelete(async (snap, context) => {
	if(snap.data().image){
		admin.storage().bucket(snap.data().image.name).delete()
	}
})