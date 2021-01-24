import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

let noOfQuestionsForTest = 30

const getQuestions = async (course: string, level: number) => {
	let questions = await admin.firestore().collection('tests/tutors/questions')
		.where('subject','==', course)
		.where('level','==', Number(level))
		.orderBy('dates.createdAt','desc')
		.limit(100)
		.get()
	if(questions.size < noOfQuestionsForTest){ throw new functions.https.HttpsError('failed-precondition', 'Number of questions in database are not enough for a test') }
	const randoms: number[] = []
	for(let i = 0; i < noOfQuestionsForTest; i++){
		let random = Math.floor(Math.random() * questions.size)
		while(randoms.includes(random)) random = Math.floor(Math.random() * questions.size)
		randoms.push(random)
	}
	return randoms.map(x => ({  '.key': questions.docs[x].id, ...questions.docs[x].data() }))
}

export const startTutorTest = functions.https.onCall(async ({ level, course, user }, context) => {
	try{
		if (!context.auth) {
			throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can take tests')
		}
		const questions = await getQuestions(course, level)

		const now = admin.firestore.Timestamp.now()
		const startedAt = now.toDate(), endedAt = now.toDate()
		endedAt.setMinutes(endedAt.getMinutes() + questions.length)

		const test = {
			questions, level, course, user,
			dates: { startedAt, endedAt },
			marked: false
		}

		const doc = await admin.firestore().collection('tests/tutors/tests').add(test)

		return { id: doc.id }
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
