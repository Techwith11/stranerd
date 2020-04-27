const functions = require('firebase-functions')
const admin = require('firebase-admin')

let getChatPath = (id1, id2) => [id1,id2].sort().join('_')

module.exports = functions.https.onRequest(async (request, response) => {
	let id = request.query.id
	let user = await admin.firestore().collection('users').doc(id).get()

	if(user.exists){
		let chattedWith = user.data().chattedWith

		let promises = chattedWith.map(async uid => {
			let user = await admin.firestore().collection('users').doc(uid).get()
			let chats = await admin.firestore().doc('chats/singles')
				.collection(getChatPath(id,uid))
				.orderBy('dates.sentAt','desc')
				.limit(1).get()
			if(chats.docs.length === 1){
				return {
					user: user.data(),
					chat: chats.docs[0].data()
				}
			}else{
				return null
			}
		})

		let results = await Promise.all(promises)
		results.filter(res => res !== null)
		results.sort((a, b) => a.chat.dates.sentAt.seconds < b.chat.dates.sentAt.seconds ? 1 : -1)

		return response.status(200).json(results)
	}else{
		return response.status(400).json({ message: 'User doesnt exist' })
	}
})