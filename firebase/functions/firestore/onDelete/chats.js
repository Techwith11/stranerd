const functions = require('firebase-functions')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/chats/{id}').onDelete(async (snap) => {
	if(snap.data().media){
		await deleteFromStorage(snap.data().media.link)
	}
})
