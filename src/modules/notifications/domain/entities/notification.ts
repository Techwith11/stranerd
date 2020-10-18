import { extractDate, extractTextFromHTML, trimToLength } from '@modules/core/validations/sanitizers'

export type Type = 'info' | 'warning' | 'error' | 'success'

export class NotificationEntity{
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly action: string
	public readonly type: Type
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

	get trimmedDescription(){ return trimToLength(extractTextFromHTML(this.description), 50) }
}

type NotificationConstructorArgs = {
	id: string, title: string, description: string, action: string, type: Type,
	createdAt: Date, seen: boolean }

