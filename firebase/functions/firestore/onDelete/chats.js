const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.firestore.document('/chats/{id}').onDelete(async (snap, context) => {
	if(snap.data().media){
		admin.storage().bucket(snap.data().media.name).delete()
	}
})