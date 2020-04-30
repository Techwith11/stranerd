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
		if(questions[i].answer === answers[i]){ score++ }
	}
	let percentage = Number(Number((score * 100) / questions.length).toFixed(0))
	let level = data.level
	let course = data.course
	let id = data.id
	let upgrade = {}
	let test = {
		questions, answers, level, course,
		user: id, score: percentage,
		dates: { takenAt: admin.firestore.FieldValue.serverTimestamp() }
	}
	let tutor = { tutor: {  upgrade } }
	if(percentage >= 70){
		tutor.tutor.level = level
		tutor.tutor.upgrade[course][level] = { passed: true, score: percentage, takenAt: admin.firestore.FieldValue.serverTimestamp() }
	}else{
		tutor.tutor.upgrade[course][level] = { passed: false, score: percentage, takenAt: admin.firestore.FieldValue.serverTimestamp() }
	}
	await admin.firestore().collection('tests/tutors/tests').add(test)
	await admin.firestore().collection('users').doc(id).set(tutor , { merge: true })

	return { score: percentage }
})