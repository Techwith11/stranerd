import { IPostRepository } from '@modules/posts/domain/irepositories/ipost'
import { PostEntity } from '@modules/posts/domain/entities/post'

export class FindPostUseCase {
	private repository: IPostRepository

	constructor(repository: IPostRepository) {
		this.repository = repository
	}

	public async call (id: string) : Promise<PostEntity | undefined> {
		return await this.repository.find(id)
	}

}
