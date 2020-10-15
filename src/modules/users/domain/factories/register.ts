import { BaseFactory } from '@modules/core/domains/factories/base'
import { AuthUser } from '@modules/users/domain/entities/auth'
import { isLongerThan, isNotLongerThan, isRequired, isEmail, isEqualTo } from '@modules/core/validations/rules'

const isLongerThan3 = (value:string) => isLongerThan(3, value)
const isLongerThan6 = (value:string) => isLongerThan(6, value)
const isNotLongerThan16 = (value:string) => isNotLongerThan(16, value)

export class RegisterFactory extends BaseFactory<null, AuthUser> {
	public readonly rules = {
		name: [isRequired, isLongerThan3],
		email: [isRequired, isEmail],
		password: [isRequired, isLongerThan6, isNotLongerThan16],
		c_password: [isRequired, (value: string) => isEqualTo(value, this.password)],
	}

	public errors = { name: undefined, email: undefined, password: undefined, c_password: undefined }

	public validValues = { name: '', email: '', password: '', c_password: '' }
	public values = { name: '', email: '', password: '', c_password: '' }

	get name(){ return this.values.name }
	set name(value: string){ this.set('name', value) }
	get email(){ return this.values.email }
	set email(value: string){ this.set('email', value) }
	get password(){ return this.values.password }
	set password(value: string){ this.set('password', value) }
	get c_password(){ return this.values.c_password }
	set c_password(value: string){ this.set('c_password', value) }

	public toModel = async () => {
		if(this.valid){
			return {
				name: this.validValues.name,
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
