const admin = require('firebase-admin')
admin.initializeApp()

// Auth Triggers
exports.authUserCreated = require('./auth/onCreate')
exports.authUserDeleted = require('./auth/onDelete')


// Request Triggers
exports.requestMakeAdmin = require('./requests/makeAdmin')
exports.braintreeWebhookSubscriptionStateChanged = require('./requests/braintreeWebhookSubscriptionStateChanged')


// On Call Triggers
exports.createNewSingleChatCollection = require('./onCall/createNewSingleChatCollection')

exports.startTutorTest = require('./onCall/tests/startTutorTest')
exports.markTutorTest = require('./onCall/tests/markTutorTest')

exports.startSession = require('./onCall/sessions/startSession')
exports.payForSession = require('./onCall/sessions/payForSession')
exports.addRatingToTutor = require('./onCall/sessions/addRatingToTutor')

exports.getClientToken = require('./onCall/payments/getClientToken')
exports.createPaymentMethod = require('./onCall/payments/createPaymentMethod')
exports.removePaymentMethod = require('./onCall/payments/removePaymentMethod')
exports.makePayment = require('./onCall/payments/makePayment')
exports.subscribeToPlan = require('./onCall/payments/subscribeToPlan')
exports.updatePaymentMethodForSubscription = require('./onCall/payments/updatePaymentMethodForSubscription')
exports.cancelSubscription = require('./onCall/payments/cancelSubscription')

exports.makeTutor = require('./onCall/roles/makeTutor')
exports.makeAdmin = require('./onCall/roles/makeAdmin')
exports.removeAdmin = require('./onCall/roles/removeAdmin')

exports.createPost = require('./onCall/contents/createPost')
exports.upvoteReply = require('./onCall/contents/upvoteReply')
exports.downvoteReply = require('./onCall/contents/downvoteReply')

exports.sendEmailAfterPurchase = require('./onCall/shop/sendEmailAfterPurchase')

exports.subscribeToMailingList = require('./onCall/mailing/subscribeToMailingList')

exports.resendEmailAfterError = require('./onCall/errors/emails')

// Firestore Triggers
// On Create
exports.firestoreSessionCreated = require('./firestore/onCreate/sessions')
exports.firestoreBlogPostCreated = require('./firestore/onCreate/blog')
exports.firestoreCourseCreated = require('./firestore/onCreate/courses')
exports.firestoreNoteCreated = require('./firestore/onCreate/notes')
exports.firestorePostCreated = require('./firestore/onCreate/posts')
exports.firestoreUserCreated = require('./firestore/onCreate/users')

// On Update
exports.firestoreBlogPostUpdated = require('./firestore/onUpdate/blog')
exports.firestoreCourseUpdated = require('./firestore/onUpdate/courses')
exports.firestoreNoteUpdated = require('./firestore/onUpdate/notes')
exports.firestorePostUpdated = require('./firestore/onUpdate/posts')
exports.firestoreUserUpdated = require('./firestore/onUpdate/users')

// On Delete
exports.firestoreBlogPostDeleted = require('./firestore/onDelete/blog')
exports.firestoreCourseDeleted = require('./firestore/onDelete/courses')
exports.firestoreNoteDeleted = require('./firestore/onDelete/notes')
exports.firestorePostDeleted = require('./firestore/onDelete/posts')
exports.firestoreUserDeleted = require('./firestore/onDelete/users')
