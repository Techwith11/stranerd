import { BaseFactory } from '@modules/core/domains/factories/base'
import { CourseEntity } from '@modules/courses/domain/entities/course'
import { CourseToModel } from '@modules/courses/data/models/course'
import {
	containsOnlyMedia, isImageOrMedia, isLongerThan, isRequired,
	isVideoOrMediaOrUndefined, hasMoreThan, isExtractedHTMLLongerThan, isRequiredIf
} from '@modules/core/validations/rules'
import { Media } from '@modules/core/data/models/base'

type Content = File | Media
const isLongerThan3 = (value: string) => isLongerThan(3, value)
const isExtractedHTMLLongerThan3 = (value: string) => isExtractedHTMLLongerThan(3, value)

export class CourseFactory extends BaseFactory<CourseEntity, CourseToModel> {
	public rules = {
		title: [isRequired, isLongerThan3],
		description: [isRequired, isExtractedHTMLLongerThan3],
		subject: [isRequired,isLongerThan3],
		module: [isRequired,isLongerThan3],
		userId: [isRequired],
		image: [isRequired, isImageOrMedia],
		hasVideo: [isRequired],
		video: [isVideoOrMediaOrUndefined, (val: any) => isRequiredIf(val, this.hasVideo)],
		documents: [isRequired, containsOnlyMedia, (val: any[]) => hasMoreThan(1,val)]
	}
	public values = {
		title: '', description: '', subject: '', module: '', userId: '',
		image: undefined, documents: [], video: undefined, hasVideo: false
	} as { title: string, description: string, subject: string, module: string, userId: string,
		image: undefined | Content, documents: Content[], video: undefined | Content, hasVideo: boolean
	}
	public validValues = {
		title: '', description: '', subject: '', module: '', userId: '',
		image: undefined, documents: [], video: undefined, hasVideo: false
	} as { title: string, description: string, subject: string, module: string, userId: string,
		image: undefined | Content, documents: Content[], video: undefined | Content, hasVideo: boolean
	}
	public errors = {
		title: undefined, description: undefined, subject: undefined, module: undefined, userId: undefined,
		image: undefined, documents: undefined, video: undefined, hasVideo: undefined
	}

	get title(){ return this.values.title }
	set title(value: string) { this.set('title', value) }
	get description(){ return this.values.description }
	set description(value: string) { this.set('description', value) }
	get subject(){ return this.values.subject }
	set subject(value: string) {
		this.set('subject', value?.toLowerCase())
		this.set('module', '')
	}
	get module(){ return this.values.module }
	set module(value: string) { this.set('module', value?.toLowerCase()) }
	get userId(){ return this.values.userId }
	set userId(value: string) { this.set('userId', value) }
	get image(){ return this.values.image! }
	set image(value: Content) { this.set('image', value) }
	get hasVideo(){ return this.values.hasVideo }
	set hasVideo(value: boolean){
		this.set('hasVideo', value)
		if(!value) this.set('video', undefined)
	}
	get video(){ return this.values.video! }
	set video(value: Content) { this.set('video', value) }
	get documents(){ return this.values.documents }
	addDocument = (value: Content) => { return this.set('documents', [...this.values.documents, value]) }
	removeDocument(value: Content){ return this.set('documents', this.values.documents.filter((doc) => doc.name !== value.name)) }

	public loadEntity = (entity: CourseEntity) => {
		this.title = entity.title
		this.description = entity.description
		this.subject = entity.subject
		this.module = entity.module
		this.userId = entity.userId
		this.image = entity.image
		this.hasVideo = entity.hasVideo
		if(entity.hasVideo) this.video = entity.video!
		this.set('documents', entity.documents)
	}

	public toModel = async () => {
		if(this.valid){
			if(this.image instanceof File) this.image = await this.uploadFile('courses/images', this.image)
			if(this.video instanceof File) this.video = await this.uploadFile('courses/videos', this.video)
			const docs = await Promise.all(this.documents.map(async (doc) => {
				if(doc instanceof File) return await this.uploadFile('courses/documents', doc)
				return doc
			}))
			this.set('documents', docs)
			return {
				title: this.validValues.title,
				description: this.validValues.description,
				subject: this.validValues.subject,
				module: this.validValues.module,
				userId: this.validValues.userId,
				image: this.validValues.image as Media,
				documents: this.validValues.documents as Media[],
				...(this.validValues.hasVideo ? { video: this.validValues.video as Media } : {}),
			}
		}else{
			throw new Error('Validation errors')
		}
	}
}
