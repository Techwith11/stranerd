import { BaseFactory } from '@root/modules/core/domains/factories/base'
import { isRequired } from '@root/modules/core/validations/rules'
import { ReplyToModel } from '@root/modules/posts/data/models/reply'

export default class ReplyFactory extends BaseFactory<ReplyToModel> {
    readonly rules = {
        body: [isRequired],
        userId: [isRequired]
    }
    readonly values = {
        body: '', userId: ''
    }
    readonly errors = {
        body: undefined, userId: undefined
    }

    setBody(value: string){ return this.set('body', value) }
    setUserId(value: string){ return this.set('userId', value) }

    public toModel = () => {
        if(this.valid){
            return {
                body: this.values.body,
                userId: this.values.userId
            }
        }else{
            throw new Error('Validation errors')
        }
    }

}
