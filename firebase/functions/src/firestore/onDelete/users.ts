import functions  from 'firebase-functions'
import admin from 'firebase-admin'
import { deleteFromAlgolia } from '../../helpers/algolia'
import { deleteFromStorage } from '../../helpers/storage'

export default functions.firestore.document('/users/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('users', snap.id)

	await deleteFromStorage(snap.data().bio.image?.link)

	const paymentMethods = await admin.firestore().collection('users').doc(snap.id).collection('paymentMethods').get()
	paymentMethods.docs.forEach(paymentMethod => paymentMethod.ref.delete())
	const transactions = await admin.firestore().collection('users').doc(snap.id).collection('transactions').get()
	transactions.docs.forEach(transaction => transaction.ref.delete())
})
