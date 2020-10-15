import { IReplyRepository } from '../irepositories/ireply'
import { ReplyEntity } from '../entities/reply'

export class LikeReplyUseCase {
	private repository: IReplyRepository

	constructor(repository: IReplyRepository) {
		this.repository = repository
	}

	public async call (postId: string, reply: ReplyEntity, userId: string) :Promise<void> {
		return await this.repository.like(postId, reply, userId)
	}

}
