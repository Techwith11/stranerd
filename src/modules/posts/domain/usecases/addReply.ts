import { IReplyRepository } from '@modules/posts/domain/irepositories/ireply'
import { ReplyFactory } from '@modules/posts/domain/factories/reply'

export class AddReplyUseCase {
	private repository: IReplyRepository

	constructor(repository: IReplyRepository) {
		this.repository = repository

	}

	public async call (postId: string, factory: ReplyFactory) :Promise<string> {
		return await this.repository.add(postId, await factory.toModel())
	}

}
