import * as admin from 'firebase-admin'
admin.initializeApp()

// Auth Triggers
import { authUserCreated } from './auth/onCreate'
import { authUserDeleted } from './auth/onDelete'
export { authUserCreated, authUserDeleted }



// Request Triggers
import { requestMakeAdmin } from './requests/makeAdmin'
import { braintreeWebhookSubscriptionStateChanged } from './requests/braintreeWebhookSubscriptionStateChanged'
export { requestMakeAdmin, braintreeWebhookSubscriptionStateChanged }



// On Call Triggers
import { startTutorTest } from './onCall/tests/startTutorTest'
import { markTutorTest } from './onCall/tests/markTutorTest'
export { startTutorTest, markTutorTest }

import { startSession } from './onCall/sessions/startSession'
import { payForSession } from './onCall/sessions/payForSession'
import { addRatingToTutor } from './onCall/sessions/addRatingToTutor'
export { startSession, payForSession, addRatingToTutor }

import { getClientToken } from './onCall/payments/getClientToken'
import { createPaymentMethod } from './onCall/payments/createPaymentMethod'
import { removePaymentMethod } from './onCall/payments/removePaymentMethod'
import { makePayment } from './onCall/payments/makePayment'
import { subscribeToPlan } from './onCall/payments/subscribeToPlan'
import { updatePaymentMethodForSubscription } from './onCall/payments/updatePaymentMethodForSubscription'
import { cancelSubscription } from './onCall/payments/cancelSubscription'
export {
	getClientToken, createPaymentMethod, removePaymentMethod, makePayment,
	subscribeToPlan, updatePaymentMethodForSubscription, cancelSubscription
}

import { makeTutor } from './onCall/roles/makeTutor'
import { makeAdmin } from './onCall/roles/makeAdmin'
import { removeAdmin } from './onCall/roles/removeAdmin'
export { makeTutor, makeAdmin, removeAdmin }

import { createPost } from './onCall/contents/createPost'
export { createPost }

import { sendEmailAfterPurchase } from './onCall/shop/sendEmailAfterPurchase'
import { subscribeToMailingList } from './onCall/mailing/subscribeToMailingList'
import { resendEmailAfterError } from './onCall/errors/resendEmailAfterError'
export { sendEmailAfterPurchase, subscribeToMailingList, resendEmailAfterError }



// Firestore Triggers
// On Create
import { firestoreArticleCreated } from './firestore/onCreate/article'
import { firestoreCourseCreated } from './firestore/onCreate/courses'
import { firestoreNoteCreated } from './firestore/onCreate/notes'
import { firestorePostCreated } from './firestore/onCreate/posts'
import { firestoreUserCreated } from './firestore/onCreate/users'
export {
	firestoreArticleCreated, firestoreCourseCreated, firestoreNoteCreated, firestorePostCreated, firestoreUserCreated
}

// On Update
import { firestoreArticleUpdated } from './firestore/onUpdate/articles'
import { firestoreCourseUpdated } from './firestore/onUpdate/courses'
import { firestoreNoteUpdated } from './firestore/onUpdate/notes'
import { firestorePostUpdated } from './firestore/onUpdate/posts'
import { firestoreUserUpdated } from './firestore/onUpdate/users'
export {
	firestoreArticleUpdated, firestoreCourseUpdated, firestoreNoteUpdated, firestorePostUpdated, firestoreUserUpdated
}

// On Delete
import { firestoreArticleDeleted } from './firestore/onDelete/article'
import { firestoreCourseDeleted } from './firestore/onDelete/courses'
import { firestoreNoteDeleted } from './firestore/onDelete/notes'
import { firestorePostDeleted } from './firestore/onDelete/posts'
import { firestoreUserDeleted } from './firestore/onDelete/users'
export {
	firestoreArticleDeleted, firestoreCourseDeleted, firestoreNoteDeleted, firestorePostDeleted, firestoreUserDeleted
}

// Database Triggers
// On Create
import { databaseNotificationCreated } from './database/onCreate/notifications'
export {
	databaseNotificationCreated
}
