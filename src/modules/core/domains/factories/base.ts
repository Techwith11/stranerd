import ValidatorService, { Rules } from '@root/modules/core/validations'
import { BaseToModel } from '@root/modules/core/data/models/base'

export abstract class BaseFactory<T extends BaseToModel> {
    abstract readonly rules: { [key: string]: Rules }
    abstract readonly values: { [key: string]: any }
    abstract readonly errors: { [key: string]: string | undefined }
    abstract toModel: () => T

    protected set(property: string, value: any) :boolean {
        const check = this.checkValidity(property, value)
        if(check.isValid) this.values[property] = value
        this.errors[property] = check.message
        return check.isValid
    }

    get valid() :boolean {
        const keys = Object.keys(this.values)
        return keys.map(key => this.isValid(key)).every(valid => valid)
    }

    protected isValid(property: string) :boolean {
         return this.checkValidity(property, this.values[property]).isValid
    }

    private checkValidity(property: string, value: any) :{ isValid: boolean, message: string | undefined } {
        if(this.rules[property]) return ValidatorService.test(value, this.rules[property])
        else return { isValid: false, message: 'Property doesnt\'t exist' }
    }

}
