const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onRequest(async (request, response) => {
	let user = await admin.auth().getUserByEmail(request.body.email)
	if(user){
		await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true })
		await admin.firestore()
			.collection('users')
			.doc(user.uid)
			.set({
				roles: { isAdmin: true }
			}, { merge: true })
		return response.status(200).json({ message: 'User upgraded to admin' })
	}else{
		return response.status(400).json({ message: 'User doesnt exist' })
	}
})