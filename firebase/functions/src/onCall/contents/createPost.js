const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { isProduction } = require('../../helpers/environment')

module.exports = functions.https.onCall(async (data, context) => {
	try{
		if (isProduction && !context.auth) {
			throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can create posts')
		}
		let id = isProduction ? context.auth.uid : data.post.userId
		let doc = await admin.firestore().collection('users').doc(id).get()
		let user = doc.data()
		if(user?.account?.questions > 0){
			let questions = user.account.questions
			questions--
			let post = data.post
			post.userId = id
			post.dates = { createdAt: admin.firestore.FieldValue.serverTimestamp() }
			try{
				let batch = admin.firestore().batch()
				let postRef = admin.firestore().collection('posts').doc()
				batch.set(postRef, post)
				let userRef = admin.firestore().collection('users').doc(id)
				batch.update(userRef, 'account.questions', questions)
				await batch.commit()
				return postRef.id
			}catch(error){
				throw new functions.https.HttpsError('unknown', error.message)
			}
		}else{
			if(user.account?.subscription?.id){
				throw new functions.https.HttpsError('failed-precondition', 'You do not have any free questions left. Consider buying more questions from the shop')
			}else {
				throw new functions.https.HttpsError('failed-precondition','You do not have any free questions left. Consider upgrading to a paid subscription to ask more questions')
			}
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
