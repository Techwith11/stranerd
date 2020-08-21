const functions = require('firebase-functions')
const { deleteFromAlgolia } = require('../../helpers/algolia')
const { deleteFromStorage } = require('../../helpers/storage')

module.exports = functions.firestore.document('/users/{id}').onDelete(async (snap) => {
	await deleteFromAlgolia('users', snap.id)

	const image = snap.data().bio.image
	await deleteFromStorage(image && image.link)

	const paymentMethods = await admin.firestore().collection('users').doc(snap.id).collection('paymentMethods').get()
	paymentMethods.docs.forEach(paymentMethod => paymentMethod.ref.delete())
	const transactions = await admin.firestore().collection('users').doc(snap.id).collection('transactions').get()
	transactions.docs.forEach(transaction => transaction.ref.delete())
})
