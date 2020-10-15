import { IArticleRepository } from '@modules/blog/domain/irepositories/iarticle'
import { ArticleEntity } from '@modules/blog/domain/entities/article'

export class FindArticleUseCase {
	private repository: IArticleRepository

	constructor(repository: IArticleRepository) {
		this.repository = repository
	}

	public async call (id: string) : Promise<ArticleEntity | undefined> {
		return await this.repository.find(id)
	}

}
