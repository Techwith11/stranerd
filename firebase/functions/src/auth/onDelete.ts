import { auth } from 'firebase-functions'
import { firestore } from 'firebase-admin'

module.exports = auth.user().onDelete(async (user) => {
	await firestore().collection('users').doc(user.uid)
		.set({
			dates: { deletedAt: firestore.FieldValue.serverTimestamp() },
		},{ merge: true })
})
