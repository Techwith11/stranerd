import { BaseFactory } from '@root/modules/core/domains/factories/base'
import {
	hasLessThan, hasMoreThan, isExtractedHTMLLongerThan,
	isLongerThan, isImageOrMedia, isRequired
} from '@root/modules/core/validations/rules'
import { ArticleToModel } from '@root/modules/blog/data/models/article'
import { Media } from '@root/modules/core/data/models/base'
import { ArticleEntity } from '@root/modules/blog/domain/entities/article'

type MediaContent = File | Media
const isLongerThan3 = (value: string) => isLongerThan(3, value)
const hasMoreThan3 = (value: string[]) => hasMoreThan(3, value)
const hasLessThan6 = (value: string[]) => hasLessThan(6, value)
const isExtractedHTMLLongerThan3 = (value: string) => isExtractedHTMLLongerThan(3, value)

export class ArticleFactory extends BaseFactory<ArticleEntity, ArticleToModel> {
	public rules = {
		title: [isRequired,isLongerThan3],
		body: [isRequired,isExtractedHTMLLongerThan3],
		tags: [isRequired,hasMoreThan3, hasLessThan6],
		userId: [isRequired],
		image: [isRequired, isImageOrMedia]
	}
	public values: { title: string, body: string, tags: string[], userId: string, image: MediaContent | undefined } = {
		title: '', body: '', tags: [], userId: '', image: undefined
	}
	public validValues: { title: string, body: string, tags: string[], userId: string, image: MediaContent | undefined } = {
		title: '', body: '', tags: [], userId: '', image: undefined
	}
	public errors = {
		title: undefined, body: undefined, tags: undefined, userId: undefined, image: undefined
	}

	get title(){ return this.values.title }
	set title(value: string){ this.set('title', value) }
	get body(){ return this.values.body }
	set body(value: string){ this.set('body', value) }
	get userId(){ return this.values.userId }
	set userId(value: string){ this.set('userId', value) }
	get tags(){ return this.values.tags }
	addTag(value: string){ return !this.values.tags.includes(value) ? this.set('tags', [...this.values.tags, value]) : false }
	removeTag(value: string){ return this.set('tags', this.values.tags.filter((tag) => tag !== value)) }
	get image(){ return this.values.image! }
	set image(file: MediaContent){ this.set('image', file) }

	public toModel = async () => {
		if(this.valid){
			if(this.image instanceof File){
				this.image = await this.uploadFile('blog', this.image)
			}
			return {
				title: this.validValues.title,
				body: this.validValues.body,
				tags: this.validValues.tags,
				userId: this.validValues.userId,
				image: this.validValues.image as Media
			}
		}else{
			throw new Error('Validation errors')
		}
	}

	public loadEntity = (entity: ArticleEntity) => {
		this.title = entity.title
		this.body = entity.body
		this.set('tags', entity.tags)
		this.userId = entity.userId
		this.image = entity.imageData
	}

}
