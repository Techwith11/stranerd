import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export default functions.https.onCall(async ({ post }, context) => {
	if (isProduction && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can create posts')
	}
	try{
		const id = post.userId
		const doc = await admin.firestore().collection('users').doc(id).get()
		const user = doc.data()
		if(user?.account?.questions > 0){
			let questions = user?.account.questions
			questions--
			post.dates = { createdAt: admin.firestore.FieldValue.serverTimestamp() }
			try{
				const batch = admin.firestore().batch()
				const postRef = admin.firestore().collection('posts').doc()
				batch.set(postRef, post)
				const userRef = admin.firestore().collection('users').doc(id)
				batch.update(userRef, 'account.questions', questions)
				await batch.commit()

				return postRef.id
			}catch(error){
				throw new functions.https.HttpsError('unknown', error.message)
			}
		}else{
			if(user?.account?.subscription?.id){
				throw new functions.https.HttpsError('failed-precondition', 'You do not have any free questions left. Consider buying more questions from the shop')
			}else {
				throw new functions.https.HttpsError('failed-precondition','You do not have any free questions left. Consider upgrading to a paid subscription to ask more questions')
			}
		}
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
