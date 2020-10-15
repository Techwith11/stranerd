import { IPostRepository } from '@modules/posts/domain/irepositories/ipost'
import { PostFactory } from '@modules/posts/domain/factories/post'

export class AddPostUseCase {
    private repository: IPostRepository

    constructor(repository: IPostRepository) {
	    this.repository = repository
    }

    public async call (factory: PostFactory) :Promise<string> {
	    return await this.repository.add(await factory.toModel())
    }

}
