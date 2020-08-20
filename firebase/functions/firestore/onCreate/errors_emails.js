const functions = require('firebase-functions')
const mailer = require('../../emails/index')

module.exports = functions.firestore.document('/errors/types/emails/{id}').onCreate(async (snap, context) => {
	let data = snap.data()
	if(data){
		let sendMail = mailer[data.type]
		let args = Object.values(data.arguments)
		await sendMail(...args)
		await snap.ref.delete()
	}
})
