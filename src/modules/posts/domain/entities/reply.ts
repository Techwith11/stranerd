import { extractDate } from '@modules/core/validations/sanitizers'

export class ReplyEntity{
	public readonly id: string
	public readonly body: string
	public readonly likes: { [key: string]: boolean }
	public readonly dislikes: { [key: string]: boolean }
	public readonly userId: string
	public readonly createdAt: Date

	constructor({ id, body, createdAt, userId, likes, dislikes }: ReplyConstructorArgs) {
		this.id = id
		this.body = body
		this.createdAt = createdAt
		this.likes = likes ?? {}
		this.dislikes = dislikes ?? {}
		this.userId = userId
	}

	get createdDate(){return extractDate(this.createdAt) }

	get likesCount(){ return Object.values(this.likes).filter((v) => v).length }

	get dislikesCount(){ return Object.values(this.dislikes).filter((v) => v).length }
}

type ReplyConstructorArgs = {
	id: string, body: string, createdAt: Date, userId: string,
	likes: { [key: string]: boolean }, dislikes: { [key: string]: boolean }
}

