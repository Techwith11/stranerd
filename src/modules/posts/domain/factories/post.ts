import { BaseFactory } from '@root/modules/core/domains/factories/base'
import { isLongerThan, isRequired } from '@root/modules/core/validations/rules'
import { PostToModel } from '@root/modules/posts/data/models/post'

const isLongerThan3 = (value: string) => isLongerThan(3, value)

export default class PostFactory extends BaseFactory<PostToModel> {
    readonly rules = {
        title: [isRequired,isLongerThan3],
        body: [isRequired],
        tags: [isRequired],
        userId: [isRequired]
    }
    readonly values = {
        title: '', body: '', tags: [], userId: ''
    }
    readonly errors = {
        title: undefined, body: undefined, tags: undefined,
        subject: undefined, module: undefined, userId: undefined
    }

    setTitle(value: string){ return this.set('title', value) }
    setBody(value: string){ return this.set('body', value) }
    setUserId(value: string){ return this.set('userId', value) }
    addTag(value: string){ return this.set('tags', [...this.values.tags, value]) }
    removeTag(value: string){ return this.set('tags', this.values.tags.filter(tag => tag !== value)) }

    public toModel = () => {
        if(this.valid){
            return {
                title: this.values.title,
                body: this.values.body,
                tags: this.values.tags,
                userId: this.values.userId
            }
        }else{
            throw new Error('Validation errors')
        }
    }

}
