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
exports.sendChat = require('./onCall/sendChat')
exports.markTutorTest = require('./onCall/markTutorTest')
exports.startSession = require('./onCall/startSession')


// Firestore Triggers
// On Create
exports.firestoreCourseCreated = require('./firestore/onCreate/courses')
exports.firestoreDiscussionCreated = require('./firestore/onCreate/discussions')
//exports.firestoreSessionCreated = require('./firestore/onCreate/sessions')

// On Update
//exports.firestoreCourseUpdated = require('./firestore/onUpdate/courses')

// On Delete
//exports.firestoreChatDeleted = require('./firestore/onDelete/chats')
//exports.firestoreCourseDeleted = require('./firestore/onDelete/courses')
//exports.firestoreUserDeleted = require('./firestore/onDelete/users')