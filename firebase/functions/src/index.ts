import * as admin from 'firebase-admin'
admin.initializeApp()

// Auth Triggers
import authUserCreated from './auth/onCreate'
import authUserDeleted from './auth/onDelete'
export { authUserCreated, authUserDeleted }



// Request Triggers
import requestMakeAdmin from './requests/makeAdmin'
import braintreeWebhookSubscriptionStateChanged from './requests/braintreeWebhookSubscriptionStateChanged'
export { requestMakeAdmin, braintreeWebhookSubscriptionStateChanged }



// On Call Triggers
import startTutorTest from './onCall/tests/startTutorTest'
import markTutorTest from './onCall/tests/markTutorTest'
export { startTutorTest, markTutorTest }

import startSession from './onCall/sessions/startSession'
import payForSession from './onCall/sessions/payForSession'
import addRatingToTutor from './onCall/sessions/addRatingToTutor'
export { startSession, payForSession, addRatingToTutor }

import getClientToken from './onCall/payments/getClientToken'
import createPaymentMethod from './onCall/payments/createPaymentMethod'
import removePaymentMethod from './onCall/payments/removePaymentMethod'
import makePayment from './onCall/payments/makePayment'
import subscribeToPlan from './onCall/payments/subscribeToPlan'
import updatePaymentMethodForSubscription from './onCall/payments/updatePaymentMethodForSubscription'
import cancelSubscription from './onCall/payments/cancelSubscription'
export {
	getClientToken, createPaymentMethod, removePaymentMethod, makePayment,
	subscribeToPlan, updatePaymentMethodForSubscription, cancelSubscription
}

import makeTutor from './onCall/roles/makeTutor'
import makeAdmin from './onCall/roles/makeAdmin'
import removeAdmin from './onCall/roles/removeAdmin'
export { makeTutor, makeAdmin, removeAdmin }

import createPost from './onCall/contents/createPost'
import upvoteReply from './onCall/contents/upvoteReply'
import downvoteReply from './onCall/contents/downvoteReply'
export { createPost, upvoteReply, downvoteReply }

import sendEmailAfterPurchase from './onCall/shop/sendEmailAfterPurchase'

import subscribeToMailingList from './onCall/mailing/subscribeToMailingList'

import resendEmailAfterError from './onCall/errors/resendEmailAfterError'

export { sendEmailAfterPurchase, subscribeToMailingList, resendEmailAfterError }



// Firestore Triggers
// On Create
import firestoreBlogPostCreated from './firestore/onCreate/blog'
import firestoreCourseCreated from './firestore/onCreate/courses'
import firestoreNoteCreated from './firestore/onCreate/notes'
import firestorePostCreated from './firestore/onCreate/posts'
import firestoreSessionCreated from './firestore/onCreate/sessions'
import firestoreUserCreated from './firestore/onCreate/users'
export {
	firestoreBlogPostCreated, firestoreCourseCreated, firestoreNoteCreated,
	firestorePostCreated, firestoreSessionCreated, firestoreUserCreated
}

// On Update
import firestoreBlogPostUpdated from './firestore/onUpdate/blog'
import firestoreCourseUpdated from './firestore/onUpdate/courses'
import firestoreNoteUpdated from './firestore/onUpdate/notes'
import firestorePostUpdated from './firestore/onUpdate/posts'
import firestoreUserUpdated from './firestore/onUpdate/users'
export {
	firestoreBlogPostUpdated, firestoreCourseUpdated, firestoreNoteUpdated, firestorePostUpdated, firestoreUserUpdated
}

// On Delete
import firestoreBlogPostDeleted from './firestore/onDelete/blog'
import firestoreCourseDeleted from './firestore/onDelete/courses'
import firestoreNoteDeleted from './firestore/onDelete/notes'
import firestorePostDeleted from './firestore/onDelete/posts'
import firestoreUserDeleted from './firestore/onDelete/users'
export {
	firestoreBlogPostDeleted, firestoreCourseDeleted, firestoreNoteDeleted, firestorePostDeleted, firestoreUserDeleted
}
