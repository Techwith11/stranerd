import { extractDate } from '@root/modules/core/validations/sanitizers'

export class DiscussionEntity{
	public readonly id: string
	public readonly body: string
	public readonly userId: string
	public readonly createdAt: Date

	constructor({ id, body, createdAt, userId }: DiscussionConstructorArgs) {
		this.id = id
		this.body = body
		this.createdAt = createdAt
		this.userId = userId
	}

	get createdDate(){return extractDate(this.createdAt) }
}

type DiscussionConstructorArgs = { id: string, body: string, createdAt: Date, userId: string }

