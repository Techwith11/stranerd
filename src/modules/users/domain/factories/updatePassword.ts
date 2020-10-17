import { BaseFactory } from '@modules/core/domains/factories/base'
import { isRequired, isEqualTo, isLongerThan, isNotLongerThan, isEmail } from '@modules/core/validations/rules'

const isLongerThan6 = (value:string) => isLongerThan(6, value)
const isNotLongerThan16 = (value:string) => isNotLongerThan(16, value)

export class UpdatePasswordFactory extends BaseFactory<null, { email: string, oldPassword: string, password: string }> {
	public readonly rules = {
		email: [isRequired, isEmail],
		oldPassword: [isRequired],
		password: [isRequired, isLongerThan6, isNotLongerThan16],
		c_password: [isRequired, (value: string) => isEqualTo(value, this.password)],
	}

	public errors = { email: '', oldPassword: '', password: undefined, c_password: undefined }

	public validValues = { email: '', oldPassword: '', password: '', c_password: '' }
	public values = { email: '', oldPassword: '', password: '', c_password: '' }

	get email(){ return this.values.email }
	set email(value: string){ this.set('email', value) }
	get oldPassword(){ return this.values.oldPassword }
	set oldPassword(value: string){ this.set('oldPassword', value) }
	get password(){ return this.values.password }
	set password(value: string){ this.set('password', value) }
	get c_password(){ return this.values.c_password }
	set c_password(value: string){ this.set('c_password', value) }

	public toModel = async () => {
		if(this.valid){
			return {
				email: this.validValues.email,
				oldPassword: this.validValues.oldPassword,
				password: this.validValues.c_password
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: null) => {
		throw Error(`Cannot load an entity into this factory, ${entity}`)
	}

}
