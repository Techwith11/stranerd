const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onCall(async (data, context) => {
	if (process.env.NODE_ENV === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can get their tests marked')
	}

	let test = await admin.firestore().collection('tests/tutors/tests').doc(data.id).get()
	test = test.data()
	let questions = test.questions
	let answers = data.answers

	let score = 0
	questions.forEach(question => {
		let answer = answers[question['.key']]
		if(answer === question.answer){ score++ }
	})
	score = Number(Number((score * 100) / questions.length).toFixed(0))

	let level = test.level
	let course = test.course
	let user = test.user

	await admin.firestore().collection('tests/tutors/tests').doc(data.id).set({
		marked: true, score, answers
	}, { merge: true })

	let doc = await admin.firestore().collection('tests/tutors/tests').doc(data.id).get()

	let upgrade = {}
	upgrade[course] = {}
	let tutor = { tutor: { upgrade } }
	if(score >= 70){
		if(level === 1){ tutor.tutor.canTeach = true }
		tutor.tutor.levels = {}
		tutor.tutor.levels[course] = level
		tutor.tutor.upgrade[course][level] = { passed: true, score, takenAt: admin.firestore.FieldValue.serverTimestamp() }
	}else{
		tutor.tutor.upgrade[course][level] = { passed: false, score, takenAt: admin.firestore.FieldValue.serverTimestamp() }
	}
	await admin.firestore().collection('users').doc(user).set(tutor , { merge: true })

	return { score }
})