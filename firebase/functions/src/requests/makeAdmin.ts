import { https } from 'firebase-functions'
import { auth, firestore } from 'firebase-admin'

module.exports = https.onRequest(async (request, response) => {
	const user = await auth().getUserByEmail('kevinfizu@gmail.com')
	if(user){
		await auth().setCustomUserClaims(user.uid, { isAdmin: true })
		await firestore()
			.collection('users')
			.doc(user.uid)
			.set({
				roles: { isAdmin: true }
			}, { merge: true })
		response.json({ message: 'kevinfizu@gmail.com upgraded to admin' }).end()
	}else{
		response.status(400).json({ message: 'kevinfizu@gmail.com doesn\'t exist' }).end()
	}
})
