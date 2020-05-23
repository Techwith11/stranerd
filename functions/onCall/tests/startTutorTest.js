const functions = require('firebase-functions')
const admin = require('firebase-admin')

let noOfQuestionsForTest = 30

let getQuestions = async (course, level) => {
	let questions = await admin.firestore().collection('tests/tutors/questions')
		.where('subject','==', course)
		.where('level','==', Number(level))
		.orderBy('dates.createdAt','desc')
		.limit(100)
		.get()
	if(questions.size < noOfQuestionsForTest){ throw new functions.https.HttpsError('failed-precondition', 'Number of questions in database are not enough for a test') }
	let randoms = []
	for(let i = 0; i < noOfQuestionsForTest; i++){
		let random = Math.floor(Math.random() * questions.size)
		while(randoms.includes(random)){
			random = Math.floor(Math.random() * questions.size)
		}
		randoms.push(random)
	}
	return randoms.map(x => ({  '.key': questions.docs[x].id, ...questions.docs[x].data() }))
}

module.exports = functions.https.onCall(async (data, context) => {
	if (functions.config().environment.mode === 'production' && !context.auth) {
		throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can take tests')
	}

	let level = data.level
	let course = data.course
	let user = data.user
	let questions = await getQuestions(course, level)

	let now = admin.firestore.Timestamp.now()
	let startedAt = now.toDate(), endedAt = now.toDate()
	endedAt.setMinutes(endedAt.getMinutes() + questions.length)

	let test = {
		questions, level, course, user,
		dates: { startedAt, endedAt },
		marked: false
	}

	let doc = await admin.firestore().collection('tests/tutors/tests').add(test)

	return { id: doc.id }
})