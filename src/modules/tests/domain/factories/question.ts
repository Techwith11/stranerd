import { BaseFactory } from '@modules/core/domains/factories/base'
import { isExtractedHTMLLongerThan, isMoreThan, isRequired } from '@modules/core/validations/rules'
import { QuestionToModel } from '../../data/models/question'
import { QuestionEntity } from '../entities/question'

export class QuestionFactory extends BaseFactory<QuestionEntity, QuestionToModel> {
	public rules = {
		title: [isRequired,(value: string) => isExtractedHTMLLongerThan(3, value)],
		level: [isRequired, (val: number) => isMoreThan(val, 0)],
		subject: [isRequired],
		module: [isRequired],
		a: [isRequired],
		b: [isRequired],
		c: [isRequired],
		d: [isRequired],
		answer: [isRequired],
		userId: [isRequired]
	}
	public values: {
		title: string, subject: string, module: string, level: number,
		a: string, b: string, c: string, d: string, answer: string, userId: string
	} = {
		title: '', subject: '', module: '', level: 1, a: '', b: '', c: '', d: '', answer: '', userId: ''
	}
	public validValues: {
		title: string, subject: string, module: string, level: number,
		a: string, b: string, c: string, d: string, answer: string, userId: string
	} = {
		title: '', subject: '', module: '', level: 1, a: '', b: '', c: '', d: '', answer: '', userId: ''
	}
	public errors = {
		title: undefined, subject: undefined, module: undefined, level: undefined,
		a: undefined, b: undefined, c: undefined, d: undefined, answer: undefined, userId: undefined
	}

	get title(){ return this.values.title }
	set title(value: string){ this.set('title', value) }
	get subject(){ return this.values.subject }
	set subject(value: string){
		this.set('subject', value?.toLowerCase())
		this.set('module', '')
	}
	get module(){ return this.values.module }
	set module(value: string){ this.set('module', value?.toLowerCase()) }
	get level(){ return this.values.level }
	set level(value: number){ this.set('level', value) }
	get a(){ return this.values.a }
	set a(value: string){ this.set('a', value) }
	get b(){ return this.values.b }
	set b(value: string){ this.set('b', value) }
	get c(){ return this.values.c }
	set c(value: string){ this.set('c', value) }
	get d(){ return this.values.d }
	set d(value: string){ this.set('d', value) }
	get answer(){ return this.values.answer }
	set answer(value: string){ this.set('answer', value) }
	get userId(){ return this.values.userId }
	set userId(value: string){ this.set('userId', value) }

	public toModel = async () => {
		if(this.valid){
			return {
				title: this.validValues.title,
				subject: this.validValues.subject,
				module: this.validValues.module,
				userId: this.validValues.userId,
				level: this.validValues.level,
				a: this.validValues.a,
				b: this.validValues.b,
				c: this.validValues.c,
				d: this.validValues.d,
				answer: this.validValues.answer,
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: QuestionEntity) => {
		this.title = entity.title
		this.level = entity.level
		this.subject = entity.subject
		this.module = entity.module
		this.a = entity.a
		this.b = entity.b
		this.c = entity.c
		this.d = entity.d
		this.answer = entity.answer
		this.userId = entity.userId
	}

}
