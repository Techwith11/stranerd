import firebase from '@root/services/firebase'

export interface QuestionFromModel {
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

export interface QuestionToModel {
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
