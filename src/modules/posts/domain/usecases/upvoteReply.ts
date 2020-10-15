import { IReplyRepository } from '../irepositories/ireply'
import { ReplyEntity } from '../entities/reply'

export class UpvoteReplyUseCase {
	private repository: IReplyRepository

	constructor(repository: IReplyRepository) {
		this.repository = repository
	}

	public async call (postId: string, reply: ReplyEntity, voterId: string) :Promise<void> {
		return await this.repository.upvote(postId, reply, voterId)
	}

}
