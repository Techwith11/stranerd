const admin = require('firebase-admin')
admin.initializeApp()

// Auth Triggers
exports.authUserCreated = require('./auth/onCreate')
exports.authUserDeleted = require('./auth/onDelete')


// Request Triggers
exports.requestMakeAdmin = require('./requests/makeAdmin')


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
exports.cancelSubscription = require('./onCall/payments/cancelSubscription')

exports.makeTutor = require('./onCall/roles/makeTutor')
exports.makeAdmin = require('./onCall/roles/makeAdmin')
exports.removeAdmin = require('./onCall/roles/removeAdmin')

exports.createPost = require('./onCall/contents/createPost')

exports.sendEmailAfterPurchase = require('./onCall/shop/sendEmailAfterPurchase')


// Firestore Triggers
// On Create
exports.firestoreErrorEmail = require('./firestore/onCreate/errors_emails')

// On Update
//exports.firestoreCourseUpdated = require('./firestore/onUpdate/courses')

// On Delete
//exports.firestoreChatDeleted = require('./firestore/onDelete/chats')
//exports.firestoreCourseDeleted = require('./firestore/onDelete/courses')