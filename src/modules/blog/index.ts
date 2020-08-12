import Bottle from 'bottlejs'
import { ArticleFirebaseDataSource } from '@root/modules/blog/data/datasources/article-firebase'
import { ArticleTransformer } from '@root/modules/blog/data/transformers/article'
import { ArticleRepository } from '@root/modules/blog/data/repositories/article'
import { GetArticlesUseCase } from '@root/modules/blog/domain/usecases/getArticles'
import { FindArticleUseCase } from '@root/modules/blog/domain/usecases/findArticle'
import { DeleteArticleUseCase } from '@root/modules/blog/domain/usecases/deleteArticle'

const bottle = new Bottle()

bottle.service('DataSources.Article', ArticleFirebaseDataSource)

bottle.service('Transformers.Article', ArticleTransformer)

bottle.service('Repositories.Article', ArticleRepository, 'DataSources.Article','Transformers.Article')

bottle.service('Usecases.Article.Find', FindArticleUseCase, 'Repositories.Article')
bottle.service('Usecases.Article.Get', GetArticlesUseCase, 'Repositories.Article')
bottle.service('Usecases.Article.Delete', DeleteArticleUseCase, 'Repositories.Article')

const { Find: FindArticle, Get: GetArticles, Delete: DeleteArticle } = bottle.container.Usecases.Article as {
	Find: FindArticleUseCase,
	Get: GetArticlesUseCase,
	Delete: DeleteArticleUseCase
}

export {
	FindArticle, GetArticles, DeleteArticle
}
