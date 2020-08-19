import { trimToLength, extractTextFromHTML } from '@root/modules/core/validations/sanitizers'

export class TutorQuestionEntity{
	public readonly id: string
	public readonly title: string
	public readonly subject: string
	public readonly module: string
	public readonly a: string
	public readonly b: string
	public readonly c: string
	public readonly d: string
	public readonly answer: string
	public readonly userId: string
	public readonly createdAt: Date

	constructor({ id, title, subject, module, a, b, c, d, answer, createdAt, userId }: TutorQuestionConstructorArgs) {
		this.id = id
		this.title = title
		this.subject = subject
		this.module = module
		this.a = a
		this.b = b
		this.c = c
		this.d = d
		this.answer = answer
		this.createdAt = createdAt
		this.userId = userId
	}

	get trimmedQuestion(){ return trimToLength(extractTextFromHTML(this.title), 200) }
}

type TutorQuestionConstructorArgs = {
	id: string, title: string, subject: string, module: string,
	a: string, b: string, c: string, d: string, answer: string,
	createdAt: Date, userId: string }

