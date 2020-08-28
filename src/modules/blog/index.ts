import { ArticleFirebaseDataSource } from '@root/modules/blog/data/datasources/article-firebase'
import { ArticleTransformer } from '@root/modules/blog/data/transformers/article'
import { ArticleRepository } from '@root/modules/blog/data/repositories/article'
import { GetArticlesUseCase } from '@root/modules/blog/domain/usecases/getArticles'
import { FindArticleUseCase } from '@root/modules/blog/domain/usecases/findArticle'
import { DeleteArticleUseCase } from '@root/modules/blog/domain/usecases/deleteArticle'
import { AddArticleUseCase } from '@root/modules/blog/domain/usecases/addArticle'
import { GetArticleFactoryUseCase } from '@root/modules/blog/domain/usecases/getArticleFactory'
import { UpdateArticleUseCase } from '@root/modules/blog/domain/usecases/updateArticle'

const articleDataSource = new ArticleFirebaseDataSource()
const articleTransformer = new ArticleTransformer()
const articleRepository = new ArticleRepository(articleDataSource, articleTransformer)

export const AddArticle = new AddArticleUseCase(articleRepository)
export const FindArticle = new FindArticleUseCase(articleRepository)
export const GetArticles = new GetArticlesUseCase(articleRepository)
export const UpdateArticle = new UpdateArticleUseCase(articleRepository)
export const DeleteArticle = new DeleteArticleUseCase(articleRepository)
export const GetArticleFactory = new GetArticleFactoryUseCase()
