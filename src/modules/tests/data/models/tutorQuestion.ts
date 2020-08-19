import firebase from '@root/services/firebase'

export interface TutorQuestionFromModel {
	id: string
	title: string
	subject: string
	module: string
	level: number
	a: string
	b: string
	c: string
	d: string
	answer: string
	userId: string
	dates: {
		createdAt: firebase.firestore.Timestamp
	}
}

export interface TutorQuestionToModel {
	title: string
	subject: string
	module: string
	level: number
	a: string
	b: string
	c: string
	d: string
	answer: string
	userId: string
}
