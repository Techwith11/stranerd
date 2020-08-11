import { BaseFactory } from '@root/modules/core/domains/factories/base'
import { AuthUser } from '@root/modules/users/domain/entities/auth'
import { isLongerThan, isNotLongerThan, isRequired, isEmail } from '@root/modules/core/validations/rules'

const isLongerThan3 = (value:string) => isLongerThan(3, value)
const isLongerThan6 = (value:string) => isLongerThan(6, value)
const isNotLongerThan16 = (value:string) => isNotLongerThan(16, value)

export class RegisterFactory extends BaseFactory<AuthUser> {
	public readonly rules = {
		name: [isRequired, isLongerThan3],
		email: [isRequired, isEmail],
		password: [isRequired, isLongerThan6, isNotLongerThan16]
	}

	public errors = { name: undefined, email: undefined, password: undefined }

	public validValues = { name: '', email: '', password: '' }
	public values = { name: '', email: '', password: '' }

	get name(){ return this.values.name }
	set name(value: string){ this.set('name', value) }
	get email(){ return this.values.email }
	set email(value: string){ this.set('email', value) }
	get password(){ return this.values.password }
	set password(value: string){ this.set('password', value) }

	public toModel = (): AuthUser => {
		return {
			name: this.validValues.name,
			email: this.validValues.email,
			password: this.validValues.password,
		};
	}

}
