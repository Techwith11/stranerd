const admin = require('firebase-admin');
admin.initializeApp()

// Auth Triggers
exports.authUserCreated = require('./auth/onCreate')
exports.authUserDeleted = require('./auth/onDelete')


// On Call Triggers
exports.makeUserTutor = require('./onCall/makeTutor')
exports.makeUserAdmin = require('./onCall/makeAdmin')


// Firestore Triggers
// On Create
//exports.firestoreChatCreated = require('./firestore/onCreate/chats')
//exports.firestoreSessionCreated = require('./firestore/onCreate/sessions')

// On Update
//exports.firestoreCourseUpdated = require('./firestore/onUpdate/courses')

// On Delete
//exports.firestoreChatDeleted = require('./firestore/onDelete/chats')
//exports.firestoreCourseDeleted = require('./firestore/onDelete/courses')
//exports.firestoreUserDeleted = require('./firestore/onDelete/users')