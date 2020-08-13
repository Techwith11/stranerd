import { Rules, ValidatorService } from '@root/modules/core/validations'
import { Uploader } from '@root/modules/core/services/uploader'
import { Media } from '@root/modules/core/data/models/base'

export abstract class BaseFactory<E, T> {
    abstract readonly rules: { [key: string]: Rules }
    public abstract values: { [key: string]: any }
    public abstract validValues: { [key: string]: any }
    public abstract errors: { [key: string]: string | undefined }
    abstract toModel: () => Promise<T>
    abstract loadEntity: (entity: E) => void

    public set(property: string, value: any) :boolean {
        const check = this.checkValidity(property, value)
        this.values[property] = value
        if(check.isValid) this.validValues[property] = value
        else this.validValues[property] = undefined
        if(value) this.errors[property] = check.message
        return check.isValid
    }

    get valid() :boolean {
        const keys = Object.keys(this.validValues)
        return keys.map(key => this.isValid(key)).every(valid => valid)
    }

    public isValid(property: string) :boolean {
         return !!this.validValues[property] && this.checkValidity(property, this.validValues[property]).isValid
    }

    public validateAll() :void {
        Object.keys(this.values).forEach(key => {
            this.set(key, this.values[key])
        })
    }

    public checkValidity(property: string, value: any) :{ isValid: boolean, message: string | undefined } {
        if(this.rules[property]) return ValidatorService.test(value, this.rules[property])
        else return { isValid: false, message: 'Property doesnt\'t exist' }
    }

    public reset(){
        Object.keys(this.values).filter(key => key !== 'userId').forEach(key => {
            this.values[key] = undefined
            this.validValues[key] = undefined
            this.errors[key] = undefined
        })
    }

    public async uploadFile(link: string, file: File) :Promise<Media> {
        return await Uploader.call(link, file)
    }
}
