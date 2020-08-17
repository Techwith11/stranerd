import { extractDate } from '@root/modules/core/validations/sanitizers'

export class ReplyEntity{
	public readonly id: string
	public readonly body: string
	public readonly userId: string
	public readonly createdAt: Date

	constructor({ id, body, createdAt, userId }: ReplyConstructorArgs) {
		this.id = id
		this.body = body
		this.createdAt = createdAt
		this.userId = userId
	}

	get createdDate(){return extractDate(this.createdAt) }
}

type ReplyConstructorArgs = { id: string, body: string, createdAt: Date, userId: string }

