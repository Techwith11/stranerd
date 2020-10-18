import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createNotification } from '../../helpers/database/notifications'

export const databaseReplyCreated = functions.database.ref('posts/{postId}/replies/{id}').onCreate(async (snap, context) => {
	const reply = snap.val()

	const postRef = await admin.firestore().collection('posts').doc(context.params.postId).get()
	const post = postRef.data()!

	await createNotification(post.userId, {
		title: `New Reply: ${post.title}`,
		description: reply.body,
		action: `/posts/${context.params.postId}#${snap.key}`,
		type: 'info'
	})
})
