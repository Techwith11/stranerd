import { BaseFactory } from '@root/modules/core/domains/factories/base'
import { isRequired, isEmail, isEqualTo, isLongerThan, isNotLongerThan } from '@root/modules/core/validations/rules'

const isLongerThan3 = (value:string) => isLongerThan(3, value)
const isLongerThan6 = (value:string) => isLongerThan(6, value)
const isNotLongerThan16 = (value:string) => isNotLongerThan(16, value)

export class UpdatePasswordFactory extends BaseFactory<{ password: string }> {
	public readonly rules = {
		password: [isRequired, isLongerThan6, isNotLongerThan16],
		c_password: [isRequired, (value: string) => isEqualTo(value, this.password)],
	}

	public errors = { password: undefined, c_password: undefined }

	public validValues = { password: '', c_password: '' }
	public values = { password: '', c_password: '' }

	get password(){ return this.values.password }
	set password(value: string){ this.set('password', value) }
	get c_password(){ return this.values.c_password }
	set c_password(value: string){ this.set('c_password', value) }

	public toModel = (): { password: string } => {
		if(this.valid){
			return { password: this.validValues.c_password }
		}else{
			throw new Error('Validation errors')
		}
	}

}
