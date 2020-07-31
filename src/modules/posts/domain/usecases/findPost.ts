import IPostRepository from '@root/modules/posts/domain/irepositories/ipost'
import PostEntity from '@root/modules/posts/domain/entities/posts'

export class FindPostUseCase {
    private repository: IPostRepository

    constructor(repository: IPostRepository) {
        this.repository = repository
    }

    public async call (id: string) : Promise<PostEntity | undefined> {
        return this.repository.find(id)
    }

}
