import ArticleEntity from '@root/modules/blog/domain/entities/article'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { ArticleToModel } from '@root/modules/blog/data/models/article'

export default interface IArticleRepository {
	add: (data: ArticleToModel) => Promise<string>,
	find: (id: string) => Promise<ArticleEntity | undefined>
	get: (conditions?: GetClauses) => Promise<ArticleEntity[]>
}
