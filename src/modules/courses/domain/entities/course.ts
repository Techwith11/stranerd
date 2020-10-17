import { Media } from '@modules/core/data/models/base'
import { extractDate, extractTextFromHTML, trimToLength } from '@modules/core/validations/sanitizers'

export class CourseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly subject: string
	public readonly module: string
	public readonly userId: string
	public readonly createdAt: Date
	public readonly image: Media
	public readonly documents: Media[]
	public readonly video: Media | undefined

	constructor({ id, title, description, subject, module, userId, createdAt, image, documents, video }: CourseConstructorArgs) {
		this.id = id
		this.title = title
		this.description = description
		this.subject = subject
		this.module = module
		this.userId = userId
		this.createdAt = createdAt
		this.image = image
		this.documents = documents
		this.video = video
	}
	get hasVideo() { return this.video !== undefined }

	get trimmedDescription() { return trimToLength(extractTextFromHTML(this.description), 200) }

	get imageLink() { return this.image?.link ?? this.image }

	get createdDate(){ return extractDate(this.createdAt) }
}

type CourseConstructorArgs = {
	id: string, title: string, description: string, subject: string, module: string
	userId: string, createdAt: Date, image: Media, documents: Media[], video: Media | undefined
}
