const admin = require('firebase-admin')
admin.initializeApp()

// Auth Triggers
export const authUserCreated = require('./auth/onCreate')
export const authUserDeleted = require('./auth/onDelete')


// Request Triggers
export const requestMakeAdmin = require('./requests/makeAdmin')
export const braintreeWebhookSubscriptionStateChanged = require('./requests/braintreeWebhookSubscriptionStateChanged')


// On Call Triggers
export const createNewSingleChatCollection = require('./onCall/createNewSingleChatCollection')

export const startTutorTest = require('./onCall/tests/startTutorTest')
export const markTutorTest = require('./onCall/tests/markTutorTest')

export const startSession = require('./onCall/sessions/startSession')
export const payForSession = require('./onCall/sessions/payForSession')
export const addRatingToTutor = require('./onCall/sessions/addRatingToTutor')

export const getClientToken = require('./onCall/payments/getClientToken')
export const createPaymentMethod = require('./onCall/payments/createPaymentMethod')
export const removePaymentMethod = require('./onCall/payments/removePaymentMethod')
export const makePayment = require('./onCall/payments/makePayment')
export const subscribeToPlan = require('./onCall/payments/subscribeToPlan')
export const updatePaymentMethodForSubscription = require('./onCall/payments/updatePaymentMethodForSubscription')
export const cancelSubscription = require('./onCall/payments/cancelSubscription')

export const makeTutor = require('./onCall/roles/makeTutor')
export const makeAdmin = require('./onCall/roles/makeAdmin')
export const removeAdmin = require('./onCall/roles/removeAdmin')

export const createPost = require('./onCall/contents/createPost')
export const upvoteReply = require('./onCall/contents/upvoteReply')
export const downvoteReply = require('./onCall/contents/downvoteReply')

export const sendEmailAfterPurchase = require('./onCall/shop/sendEmailAfterPurchase')

export const subscribeToMailingList = require('./onCall/mailing/subscribeToMailingList')

export const resendEmailAfterError = require('./onCall/errors/resendEmailAfterError')

// Firestore Triggers
// On Create
export const firestoreBlogPostCreated = require('./firestore/onCreate/blog')
export const firestoreCourseCreated = require('./firestore/onCreate/courses')
export const firestoreNoteCreated = require('./firestore/onCreate/notes')
export const firestorePostCreated = require('./firestore/onCreate/posts')
export const firestoreSessionCreated = require('./firestore/onCreate/sessions')
export const firestoreUserCreated = require('./firestore/onCreate/users')

// On Update
export const firestoreBlogPostUpdated = require('./firestore/onUpdate/blog')
export const firestoreCourseUpdated = require('./firestore/onUpdate/courses')
export const firestoreNoteUpdated = require('./firestore/onUpdate/notes')
export const firestorePostUpdated = require('./firestore/onUpdate/posts')
export const firestoreUserUpdated = require('./firestore/onUpdate/users')

// On Delete
export const firestoreBlogPostDeleted = require('./firestore/onDelete/blog')
export const firestoreCourseDeleted = require('./firestore/onDelete/courses')
export const firestoreNoteDeleted = require('./firestore/onDelete/notes')
export const firestorePostDeleted = require('./firestore/onDelete/posts')
export const firestoreUserDeleted = require('./firestore/onDelete/users')
