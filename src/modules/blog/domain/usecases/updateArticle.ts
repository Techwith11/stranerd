import { IArticleRepository } from '@modules/blog/domain/irepositories/iarticle'
import { ArticleFactory } from '@modules/blog/domain/factories/article'

export class UpdateArticleUseCase {
	private repository: IArticleRepository

	constructor(repository: IArticleRepository) {
		this.repository = repository
	}

	public async call (id: string, factory: ArticleFactory) :Promise<string> {
		return await this.repository.update(id, await factory.toModel())
	}

}
