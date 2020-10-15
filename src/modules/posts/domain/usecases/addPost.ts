import { IPostRepository } from '../irepositories/ipost'
import { PostFactory } from '../factories/post'

export class AddPostUseCase {
    private repository: IPostRepository

    constructor(repository: IPostRepository) {
	    this.repository = repository
    }

    public async call (factory: PostFactory) :Promise<string> {
	    return await this.repository.add(await factory.toModel())
    }

}
