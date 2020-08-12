import { IArticleRepository } from '@root/modules/blog/domain/irepositories/iarticle'

export class DeleteArticleUseCase {
    private repository: IArticleRepository

    constructor(repository: IArticleRepository) {
        this.repository = repository
    }

    public async call (id: string) : Promise<void> {
        return await this.repository.delete(id)
    }

}
