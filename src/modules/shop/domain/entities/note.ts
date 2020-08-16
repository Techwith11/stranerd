import { Media } from '@root/modules/core/data/models/base'
import { extractDate } from '@root/modules/core/validations/sanitizers'

export class NoteEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly price: number
	public readonly userId: string
	public readonly createdAt: Date
	public readonly image: Media
	public readonly document: Media

	constructor({ id, title, description, price, userId, createdAt, image, document }: NoteConstructorArgs) {
		this.id = id
		this.title = title
		this.description = description
		this.price = price
		this.userId = userId
		this.createdAt = createdAt
		this.image = image
		this.document = document
	}

	get imageLink() { return this.image?.link ?? this.image }

	get createdDate(){ return extractDate(this.createdAt) }
}

type NoteConstructorArgs = {
	id: string, title: string, description: string, price: number,
	userId: string, createdAt: Date, document: Media, image: Media
}
