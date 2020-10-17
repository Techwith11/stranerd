import { BaseFactory } from '@modules/core/domains/factories/base'
import { isExtractedHTMLLongerThan, isRequired } from '@modules/core/validations/rules'
import { ReplyToModel } from '../../data/models/reply'
import { ReplyEntity } from '../entities/reply'

const isExtractedHTMLLongerThan3 = (value: string) => isExtractedHTMLLongerThan(3, value)
export class ReplyFactory extends BaseFactory<ReplyEntity, ReplyToModel> {
	readonly rules = {
		body: [isRequired,isExtractedHTMLLongerThan3],
		userId: [isRequired],
		likes: [],
		dislikes: []
	}
	public values = {
		body: '', userId: '', likes: {}, dislikes: {}
	}
	public validValues = {
		body: '', userId: '', likes: {}, dislikes: {}
	}
	public errors = {
		body: undefined, userId: undefined, likes: undefined, dislikes: undefined
	}

	get body(){ return this.values.body }
	set body(value: string){ this.set('body', value) }
	get userId(){ return this.values.userId }
	set userId(value: string){ this.set('userId', value) }
	get likes(){ return this.values.likes }
	set likes(value: any){ this.set('likes', value) }
	get dislikes(){ return this.values.dislikes }
	set dislikes(value: any){ this.set('dislikes', value) }

	public toModel = async () => {
		if(this.valid){
			return {
				body: this.validValues.body,
				userId: this.validValues.userId,
				likes: this.validValues.likes,
				dislikes: this.validValues.dislikes,
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: ReplyEntity) => {
		throw Error(`Cannot load an entity into this factory, ${entity}`)
	}

	public reset(){
		this.values.body = ''
		this.validValues.body = ''
		this.errors.body = undefined
		this.values.likes = {}
		this.validValues.likes = {}
		this.errors.likes = undefined
		this.values.dislikes = {}
		this.validValues.dislikes = {}
		this.errors.dislikes = undefined
	}

}
