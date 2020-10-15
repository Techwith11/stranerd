import { BaseFactory } from '@modules/core/domains/factories/base'
import { isExtractedHTMLLongerThan, isRequired } from '@modules/core/validations/rules'
import { DiscussionToModel } from '@modules/courses/data/models/discussion'
import { DiscussionEntity } from '@modules/courses/domain/entities/discussion'

const isExtractedHTMLLongerThan3 = (value: string) => isExtractedHTMLLongerThan(3, value)
export class DiscussionFactory extends BaseFactory<DiscussionEntity, DiscussionToModel> {
	readonly rules = {
		body: [isRequired,isExtractedHTMLLongerThan3],
		userId: [isRequired]
	}
	public values = {
		body: '', userId: ''
	}
	public validValues = {
		body: '', userId: ''
	}
	public errors = {
		body: undefined, userId: undefined
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
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: DiscussionEntity) => {
		throw Error(`Cannot load an entity into this factory, ${entity}`)
	}

}
