import { ArticleFactory } from '@root/modules/blog/domain/factories/article'

export class GetArticleFactoryUseCase {
	public call () :ArticleFactory {
		return new ArticleFactory()
	}
}

