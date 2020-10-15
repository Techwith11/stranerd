import { BaseFactory } from '@modules/core/domains/factories/base'
import { AuthUser } from '@modules/users/domain/entities/auth'
import { isLongerThan, isNotLongerThan, isRequired, isEmail } from '@modules/core/validations/rules'

const isLongerThan6 = (value:string) => isLongerThan(6, value)
const isNotLongerThan16 = (value:string) => isNotLongerThan(16, value)

export class LoginFactory extends BaseFactory<null, AuthUser> {
	public readonly rules = {
		email: [isRequired, isEmail],
		password: [isRequired, isLongerThan6, isNotLongerThan16]
	}

	public errors = { email: undefined, password: undefined }

	public validValues = { email: '', password: '' }
	public values = { email: '', password: '' }

	get email(){ return this.values.email }
	set email(value: string){ this.set('email', value) }
	get password(){ return this.values.password }
	set password(value: string){ this.set('password', value) }

	public toModel = async () => {
		if(this.valid){
			return {
				email: this.validValues.email,
				password: this.validValues.password,
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: null) => {
		throw Error(`Cannot load an entity into this factory, ${entity}`)
	}

}
