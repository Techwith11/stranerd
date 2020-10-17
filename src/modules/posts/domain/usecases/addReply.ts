import { IReplyRepository } from '../irepositories/ireply'
import { ReplyFactory } from '../factories/reply'

export class AddReplyUseCase {
	private repository: IReplyRepository

	constructor(repository: IReplyRepository) {
		this.repository = repository

	}

	public async call (postId: string, factory: ReplyFactory) :Promise<string> {
		return await this.repository.add(postId, await factory.toModel())
	}

}
