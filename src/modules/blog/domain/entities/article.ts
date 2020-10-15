import { trimToLength, extractTextFromHTML, extractDate } from '@modules/core/validations/sanitizers'
import { Media } from '@modules/core/data/models/base'

export class ArticleEntity{
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly imageData: Media
	public readonly tags: string[]
	public readonly userId: string
	public readonly createdAt: Date

	constructor({ id, title, body, imageData, tags, createdAt, userId }: ArticleConstructorArgs) {
		this.id = id
		this.title = title
		this.body = body
		this.imageData = imageData
		this.tags = tags
		this.createdAt = createdAt
		this.userId = userId
	}

	get image(){ return this.imageData.link }

	get trimmedBody(){ return trimToLength(extractTextFromHTML(this.body), 200) }

	get createdDate(){return extractDate(this.createdAt) }
}

type ArticleConstructorArgs = { id: string, title: string, body: string, imageData: Media, tags: string[], createdAt: Date, userId: string }

