import { GetClauses } from '@modules/core/data/datasources/base'
import { ArticleFromModel, ArticleToModel } from '@modules/blog/data/models/article'

export abstract class ArticleBaseDataSource {
	public abstract create: (data: ArticleToModel) => Promise<string>
	public abstract get: (condition?: GetClauses) => Promise<ArticleFromModel[]>
	public abstract find: (id: string) => Promise<ArticleFromModel | undefined>
	public abstract update: (id: string, data: ArticleToModel) => Promise<string>
	public abstract delete: (id: string) => Promise<void>
}
