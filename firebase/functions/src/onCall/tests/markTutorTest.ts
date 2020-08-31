import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { isProduction } from '../../helpers/environment'

export const markTutorTest = functions.https.onCall(async (data, context) => {
	try{
		if (isProduction && !context.auth) {
			throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can get their tests marked')
		}

		const doc = await admin.firestore().collection('tests/tutors/tests').doc(data.id).get()
		const { questions, level, course, user } = doc.data() ?? {}
		const answers = data.answers

		let score = 0
		questions.forEach((question: any) => {
			const answer = answers[question['.key']]
			if(answer === question.answer){ score++ }
		})
		score = Number(Number((score * 100) / questions.length).toFixed(0))

		await admin.firestore().collection('tests/tutors/tests').doc(data.id).set({
			marked: true, score, answers
		}, { merge: true })

		const upgrade: any = {}
		upgrade[course] = {}
		const tutor: any = { tutor: { upgrade } }
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
	}catch(error){
		throw new functions.https.HttpsError('unknown', error.message)
	}
})
