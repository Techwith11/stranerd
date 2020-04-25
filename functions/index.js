const admin = require('firebase-admin');
admin.initializeApp()

// Auth Triggers
exports.authUserCreated = require('./auth/onCreate')
exports.authUserDeleted = require('./auth/onDelete')


// Request Triggers
exports.requestMakeUserAdmin = require('./requests/makeAdmin')


// On Call Triggers
exports.makeUserTutor = require('./onCall/makeTutor')
exports.makeUserAdmin = require('./onCall/makeAdmin')


// Firestore Triggers
// On Create
//exports.firestoreChatCreated = require('./firestore/onCreate/chats')
exports.firestoreCourseCreated = require('./firestore/onCreate/courses')
exports.firestoreDiscussionCreated = require('./firestore/onCreate/discussions')
//exports.firestoreSessionCreated = require('./firestore/onCreate/sessions')

// On Update
//exports.firestoreCourseUpdated = require('./firestore/onUpdate/courses')

// On Delete
//exports.firestoreChatDeleted = require('./firestore/onDelete/chats')
//exports.firestoreCourseDeleted = require('./firestore/onDelete/courses')
//exports.firestoreUserDeleted = require('./firestore/onDelete/users')