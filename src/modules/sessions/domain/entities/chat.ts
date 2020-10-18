import { extractDate } from '@modules/core/validations/sanitizers'
import { Media } from '@modules/core/data/models/base'

export class ChatEntity{
	public readonly id: string
	public readonly content: string | undefined
	public readonly media: Media | undefined
	public readonly from: string
	public readonly createdAt: Date
	public readonly readAt: Date | undefined

	constructor({ id, content, media, from, createdAt, readAt }: ChatConstructorArgs) {
		this.id = id
		this.content = content
		this.media = media
		this.from = from
		this.createdAt = createdAt
		this.readAt = readAt
	}

	get createdDate(){return extractDate(this.createdAt) }

	get isMedia(){ return !!this.media }

	get isRead(){ return !!this.readAt }
}

type ChatConstructorArgs = {
	id: string,
	content?: string,
	media?: Media,
	createdAt: Date
	readAt?: Date
	from: string
}

