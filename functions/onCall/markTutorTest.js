const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		/*TODO: Delete comment */ //throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can get their tests marked')
	}
	let questions = data.questions
	let answers = data.answers
	if(questions.length !== answers.length){
		throw new functions.https.HttpsError('invalid-argument', 'Questions length doesnt match that of answers')
	}
	let score = 0
	for(let i = 0; i < questions.length; i++){
		if(questions[i].answer === answers[i]){
			score++
		}
	}
	let percentage = Number(Number((score * 100) / questions.length).toFixed(0))
	let level = data.level
	let id = data.id
	let upgrade = { score: percentage }
	upgrade[level] = percentage >= 70 ? { passed: true } : { passed: false, canRetakeAt: admin.firestore.FieldValue.serverTimestamp() }
	console.log(upgrade)
	// TODO: Create new test instance
	/*await admin.firestore().collection('users').doc(id).set({
		tutor: {
			level,
			upgrade
		}
	}, { merge: true })*/

	return percentage
})