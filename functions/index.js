const admin = require('firebase-admin');
admin.initializeApp()

// Auth Triggers
exports.authUserCreated = require('./auth/onCreate')
exports.authUserDeleted = require('./auth/onDelete')


// Request Triggers
exports.requestMakeAdmin = require('./requests/makeAdmin')


// On Call Triggers
exports.makeTutor = require('./onCall/makeTutor')
exports.makeAdmin = require('./onCall/makeAdmin')
exports.startTutorTest = require('./onCall/startTutorTest')
exports.markTutorTest = require('./onCall/markTutorTest')
exports.createNewSingleChatCollection = require('./onCall/createNewSingleChatCollection')

exports.startSession = require('./onCall/sessions/startSession')
exports.payForSession = require('./onCall/sessions/payForSession')
exports.addRatingToTutor = require('./onCall/sessions/addRatingToTutor')

exports.getClientToken = require('./onCall/payments/getClientToken')
exports.processPayment = require('./onCall/payments/processPayment')
exports.createPaymentMethod = require('./onCall/payments/createPaymentMethod')
exports.makePayment = require('./onCall/payments/makePayment')
exports.subscribeToPlan = require('./onCall/payments/subscribeToPlan')


// Firestore Triggers
// On Create
exports.firestoreCourseCreated = require('./firestore/onCreate/courses')

// On Update
//exports.firestoreCourseUpdated = require('./firestore/onUpdate/courses')

// On Delete
//exports.firestoreChatDeleted = require('./firestore/onDelete/chats')
//exports.firestoreCourseDeleted = require('./firestore/onDelete/courses')