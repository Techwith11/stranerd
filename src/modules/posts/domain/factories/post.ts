import { BaseFactory } from '@root/modules/core/domains/factories/base'
import {
    hasLessThan,
    hasMoreThan,
    isExtractedHTMLLongerThan,
    isLongerThan,
    isRequired
} from '@root/modules/core/validations/rules'
import { PostToModel } from '@root/modules/posts/data/models/post'
import { PostEntity } from '@root/modules/posts/domain/entities/post'

const isLongerThan3 = (value: string) => isLongerThan(3, value)
const hasMoreThan3 = (value: string[]) => hasMoreThan(3, value)
const hasLessThan6 = (value: string[]) => hasLessThan(6, value)
const isExtractedHTMLLongerThan3 = (value: string) => isExtractedHTMLLongerThan(3, value)

export class PostFactory extends BaseFactory<PostEntity, PostToModel> {
    public rules = {
        title: [isRequired,isLongerThan3],
        body: [isRequired,isExtractedHTMLLongerThan3],
        tags: [isRequired,hasMoreThan3, hasLessThan6],
        subject: [isRequired],
        module: [isRequired],
        userId: [isRequired]
    }
    public values: { title: string, body: string, tags: string[], userId: string, subject: string, module: string } = {
        title: '', body: '', tags: [], userId: '', subject: '', module: ''
    }
    public validValues: { title: string, body: string, tags: string[], userId: string, subject: string, module: string } = {
        title: '', body: '', tags: [], userId: '', subject: '', module: ''
    }
    public errors = {
        title: undefined, body: undefined, tags: undefined,
        subject: undefined, module: undefined, userId: undefined
    }

    get title(){ return this.values.title }
    set title(value: string){ this.set('title', value) }
    get body(){ return this.values.body }
    set body(value: string){ this.set('body', value) }
    get subject(){ return this.values.subject }
    set subject(value: string){
        this.set('subject', value)
        this.set('module', '')
    }
    get module(){ return this.values.module }
    set module(value: string){ this.set('module', value) }
    get userId(){ return this.values.userId }
    set userId(value: string){ this.set('userId', value) }
    get tags(){ return this.values.tags }
    addTag(value: string){ return !this.values.tags.includes(value) ? this.set('tags', [...this.values.tags, value]) : false }
    removeTag(value: string){ return this.set('tags', this.values.tags.filter(tag => tag !== value)) }

    public toModel = async () => {
        if(this.valid){
            return {
                title: this.validValues.title,
                body: this.validValues.body,
                subject: this.validValues.subject,
                module: this.validValues.module,
                tags: this.validValues.tags,
                userId: this.validValues.userId
            }
        }else{
            throw new Error('Validation errors')
        }
    }

    public loadEntity = (entity: PostEntity) => {
        throw Error('Cannot load an entity into this factory')
    }

}
