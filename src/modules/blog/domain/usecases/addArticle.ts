import { IArticleRepository } from '../irepositories/iarticle'
import { ArticleFactory } from '../factories/article'

export class AddArticleUseCase {
	private repository: IArticleRepository

	constructor(repository: IArticleRepository) {
		this.repository = repository
	}

	public async call (factory: ArticleFactory) : Promise<string> {
		return await this.repository.add(await factory.toModel())
	}

}
