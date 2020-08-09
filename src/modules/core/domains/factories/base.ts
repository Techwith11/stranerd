import ValidatorService, { Rules } from '@root/modules/core/validations'

export abstract class BaseFactory<T> {
    abstract readonly rules: { [key: string]: Rules }
    public abstract values: { [key: string]: any }
    abstract readonly validValues: { [key: string]: any }
    abstract readonly errors: { [key: string]: string | undefined }
    abstract toModel: () => T

    protected set(property: string, value: any) :boolean {
        const check = this.checkValidity(property, value)
        this.values[property] = value
        if(check.isValid) this.validValues[property] = value
        else this.validValues[property] = undefined
        this.errors[property] = check.message
        return check.isValid
    }

    get valid() :boolean {
        const keys = Object.keys(this.validValues)
        return keys.map(key => this.isValid(key)).every(valid => valid)
    }

    protected isValid(property: string) :boolean {
         return this.checkValidity(property, this.validValues[property]).isValid
    }

    private checkValidity(property: string, value: any) :{ isValid: boolean, message: string | undefined } {
        if(this.rules[property]) return ValidatorService.test(value, this.rules[property])
        else return { isValid: false, message: 'Property doesnt\'t exist' }
    }

}
