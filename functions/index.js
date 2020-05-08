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
exports.startSession = require('./onCall/startSession')
exports.acceptSession = require('./onCall/acceptSession')
exports.addRatingToTutor = require('./onCall/addRatingToTutor')
exports.createNewSingleChatCollection = require('./onCall/createNewSingleChatCollection')
exports.getBraintreeClientToken = require('./onCall/payments/getBraintreeClientToken')


// Firestore Triggers
// On Create
exports.firestoreCourseCreated = require('./firestore/onCreate/courses')

// On Update
//exports.firestoreCourseUpdated = require('./firestore/onUpdate/courses')

// On Delete
//exports.firestoreChatDeleted = require('./firestore/onDelete/chats')
//exports.firestoreCourseDeleted = require('./firestore/onDelete/courses')