import { trimToLength, extractTextFromHTML } from '@root/modules/core/validations/sanitizers'
import { Media } from '@root/modules/core/data/models/base'

export default class ArticleEntity{
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly image: Media
	public readonly tags: string[]
	public readonly userId: string
	public readonly createdAt: Date

	constructor({ id, title, body, image, tags, createdAt, userId }: ArticleConstructorArgs) {
		this.id = id
		this.title = title
		this.body = body
		this.image = image
		this.tags = tags
		this.createdAt = createdAt
		this.userId = userId
	}
	get trimmedBody(){ return trimToLength(extractTextFromHTML(this.body), 200) }

	get createdDate(){
		const date = this.createdAt
		const now = new Date()
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		const yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
		if(date > today){
			return date.toTimeString().slice(0,5)
		}else if(date > yesterday){
			return 'Yesterday'
		}else{
			return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
		}
	}
}

type ArticleConstructorArgs = { id: string, title: string, body: string, image: Media, tags: string[], createdAt: Date, userId: string }

