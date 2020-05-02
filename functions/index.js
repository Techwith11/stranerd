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


// Firestore Triggers
// On Create
exports.firestoreChatCreated = require('./firestore/onCreate/chats')
exports.firestoreCourseCreated = require('./firestore/onCreate/courses')

// On Update
//exports.firestoreCourseUpdated = require('./firestore/onUpdate/courses')

// On Delete
//exports.firestoreChatDeleted = require('./firestore/onDelete/chats')
//exports.firestoreCourseDeleted = require('./firestore/onDelete/courses')
//exports.firestoreUserDeleted = require('./firestore/onDelete/users')