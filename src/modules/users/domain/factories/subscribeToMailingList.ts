import { BaseFactory } from '@modules/core/domains/factories/base'
import { isRequired, isEmail } from '@modules/core/validations/rules'

export class SubscribeToMailingListFactory extends BaseFactory<null, { email: string }> {
	public readonly rules = {
		email: [isRequired, isEmail]
	}

	public errors = { email: undefined }

	public validValues = { email: '' }
	public values = { email: '' }

	get email(){ return this.values.email }
	set email(value: string){ this.set('email', value) }

	public toModel = async () => {
		if(this.valid){
			return { email: this.validValues.email }
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: null) => {
		throw Error(`Cannot load an entity into this factory, ${entity}`)
	}

}
