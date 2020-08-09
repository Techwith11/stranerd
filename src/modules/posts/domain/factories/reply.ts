import { BaseFactory } from '@root/modules/core/domains/factories/base'
import { isExtractedHTMLLongerThan, isRequired } from '@root/modules/core/validations/rules'
import { ReplyToModel } from '@root/modules/posts/data/models/reply'
import { serverTimeStamp } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

const isExtractedHTMLLongerThan3 = (value: string) => isExtractedHTMLLongerThan(3, value)
export default class ReplyFactory extends BaseFactory<ReplyToModel> {
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

    public toModel = () => {
        if(this.valid){
            return {
                body: this.validValues.body,
                userId: this.validValues.userId,
                dates: { createdAt: serverTimeStamp() },
            }
        }else{
            throw new Error('Validation errors')
        }
    }

}
