import { extractDate } from '@modules/core/validations/sanitizers'

export class ReplyEntity{
	public readonly id: string
	public readonly body: string
	public readonly votes: { [key: string]: boolean }
	public readonly likes: { [key: string]: boolean }
	public readonly dislikes: { [key: string]: boolean }
	public readonly userId: string
	public readonly createdAt: Date

	constructor({ id, body, createdAt, userId, votes, likes, dislikes }: ReplyConstructorArgs) {
		this.id = id
		this.body = body
		this.createdAt = createdAt
		this.votes = votes ?? {}
		this.likes = likes ?? {}
		this.dislikes = dislikes ?? {}
		this.userId = userId
	}

	get createdDate(){return extractDate(this.createdAt) }

	get votesCount(){ return Object.values(this.votes).filter((v) => v).length }
}

type ReplyConstructorArgs = {
	id: string, body: string, createdAt: Date, userId: string,
	votes: { [key: string]: boolean }, likes: { [key: string]: boolean }, dislikes: { [key: string]: boolean }
}

