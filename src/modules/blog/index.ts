import Bottle from 'bottlejs'
import { ArticleFirebaseDataSource } from '@root/modules/blog/data/datasources/article-firebase'
import { ArticleTransformer } from '@root/modules/blog/data/transformers/article'
import { ArticleRepository } from '@root/modules/blog/data/repositories/article'
import { GetArticlesUseCase } from '@root/modules/blog/domain/usecases/getArticles'
import { FindArticleUseCase } from '@root/modules/blog/domain/usecases/findArticle'
import { DeleteArticleUseCase } from '@root/modules/blog/domain/usecases/deleteArticle'
import { AddArticleUseCase } from '@root/modules/blog/domain/usecases/addArticle'
import { GetArticleFactoryUseCase } from '@root/modules/blog/domain/usecases/getArticleFactory'
import { UpdateArticleUseCase } from '@root/modules/blog/domain/usecases/updateArticle'

const bottle = new Bottle()

bottle.service('DataSources.Article', ArticleFirebaseDataSource)

bottle.service('Transformers.Article', ArticleTransformer)

bottle.service('Repositories.Article', ArticleRepository, 'DataSources.Article','Transformers.Article')

bottle.service('Usecases.Article.Add', AddArticleUseCase, 'Repositories.Article')
bottle.service('Usecases.Article.Find', FindArticleUseCase, 'Repositories.Article')
bottle.service('Usecases.Article.Get', GetArticlesUseCase, 'Repositories.Article')
bottle.service('Usecases.Article.Update', UpdateArticleUseCase, 'Repositories.Article')
bottle.service('Usecases.Article.Delete', DeleteArticleUseCase, 'Repositories.Article')
bottle.service('Usecases.Article.GetFactory', GetArticleFactoryUseCase)

const {
	Add: AddArticle, Find: FindArticle, Get: GetArticles,
	Update: UpdateArticle, Delete: DeleteArticle, GetFactory: GetArticleFactory
} = bottle.container.Usecases.Article as {
	Add: AddArticleUseCase,
	Find: FindArticleUseCase,
	Get: GetArticlesUseCase,
	Update: UpdateArticleUseCase,
	Delete: DeleteArticleUseCase,
	GetFactory: GetArticleFactoryUseCase
}

export {
	AddArticle, FindArticle, GetArticles, UpdateArticle, DeleteArticle, GetArticleFactory
}
