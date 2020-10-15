import { BaseFactory } from '@modules/core/domains/factories/base'
import { isExtractedHTMLLongerThan, isRequired } from '@modules/core/validations/rules'
import { ReplyToModel } from '@modules/posts/data/models/reply'
import { ReplyEntity } from '@modules/posts/domain/entities/reply'

const isExtractedHTMLLongerThan3 = (value: string) => isExtractedHTMLLongerThan(3, value)
export class ReplyFactory extends BaseFactory<ReplyEntity, ReplyToModel> {
	readonly rules = {
		body: [isRequired,isExtractedHTMLLongerThan3],
		userId: [isRequired],
		votes: []
	}
	public values = {
		body: '', userId: '', votes: {}
	}
	public validValues = {
		body: '', userId: '', votes: {}
	}
	public errors = {
		body: undefined, userId: undefined, votes: undefined
	}

	get body(){ return this.values.body }
	set body(value: string){ this.set('body', value) }
	get userId(){ return this.values.userId }
	set userId(value: string){ this.set('userId', value) }

	public toModel = async () => {
		if(this.valid){
			return {
				body: this.validValues.body,
				userId: this.validValues.userId,
				votes: this.validValues.votes,
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
		this.values.votes = {}
		this.validValues.votes = {}
		this.errors.votes = undefined
	}

}
