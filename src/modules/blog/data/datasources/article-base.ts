import { GetClauses } from '@root/modules/core/data/datasources/base'
import { ArticleFromModel, ArticleToModel } from '@root/modules/blog/data/models/article'

export default abstract class ArticleBaseDataSource {
	public abstract create: (data: ArticleToModel) => Promise<string>
	public abstract get: (condition?: GetClauses) => Promise<ArticleFromModel[]>
	public abstract find: (id: string) => Promise<ArticleFromModel | undefined>
}
