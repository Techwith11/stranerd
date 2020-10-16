import { extractDate } from '@modules/core/validations/sanitizers'

export class NotificationEntity{
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly action: string
	public readonly type: string
	public readonly seen: boolean
	public readonly createdAt: Date

	constructor({ id, title, description, action, type, createdAt, seen }: NotificationConstructorArgs) {
		this.id = id
		this.title = title
		this.description = description
		this.action = action
		this.type = type
		this.seen = seen
		this.createdAt = createdAt
	}

	get createdDate(){return extractDate(this.createdAt) }
}

type NotificationConstructorArgs = {
	id: string, title: string, description: string, action: string, type: string,
	createdAt: Date, seen: boolean }

