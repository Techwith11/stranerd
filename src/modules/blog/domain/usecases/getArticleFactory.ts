import { ArticleFactory } from '@modules/blog/domain/factories/article'

export class GetArticleFactoryUseCase {
	public call () :ArticleFactory {
		return new ArticleFactory()
	}
}

