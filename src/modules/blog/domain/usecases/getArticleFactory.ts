import { ArticleFactory } from '../factories/article'

export class GetArticleFactoryUseCase {
	public call () :ArticleFactory {
		return new ArticleFactory()
	}
}

