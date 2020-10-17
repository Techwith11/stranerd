import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { sendNewNotificationEmail } from '../../helpers/email'
import { Notification } from '../../helpers/database/notifications'

export const databaseNotificationCreated = functions.database.ref('users/{userId}/notifications/{id}').onCreate(async (snap, context) => {
	const notification = snap.val() as Notification

	const user = (await admin.firestore().collection('users').doc(context.params.userId).get()).data()!
	const email = user.bio.email

	await sendNewNotificationEmail(email, notification)
})
