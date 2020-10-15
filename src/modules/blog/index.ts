import { ArticleFirebaseDataSource } from './data/datasources/article-firebase'
import { ArticleTransformer } from './data/transformers/article'
import { ArticleRepository } from './data/repositories/article'
import { GetArticlesUseCase } from './domain/usecases/getArticles'
import { FindArticleUseCase } from './domain/usecases/findArticle'
import { DeleteArticleUseCase } from './domain/usecases/deleteArticle'
import { AddArticleUseCase } from './domain/usecases/addArticle'
import { GetArticleFactoryUseCase } from './domain/usecases/getArticleFactory'
import { UpdateArticleUseCase } from './domain/usecases/updateArticle'

const articleDataSource = new ArticleFirebaseDataSource()
const articleTransformer = new ArticleTransformer()
const articleRepository = new ArticleRepository(articleDataSource, articleTransformer)

export const AddArticle = new AddArticleUseCase(articleRepository)
export const FindArticle = new FindArticleUseCase(articleRepository)
export const GetArticles = new GetArticlesUseCase(articleRepository)
export const UpdateArticle = new UpdateArticleUseCase(articleRepository)
export const DeleteArticle = new DeleteArticleUseCase(articleRepository)
export const GetArticleFactory = new GetArticleFactoryUseCase()
