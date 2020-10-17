import { ArticleEntity } from '../entities/article'
import { GetClauses } from '@modules/core/data/datasources/base'
import { ArticleToModel } from '../../data/models/article'

export interface IArticleRepository {
	add: (data: ArticleToModel) => Promise<string>,
	find: (id: string) => Promise<ArticleEntity | undefined>
	get: (conditions?: GetClauses) => Promise<ArticleEntity[]>
	update: (id: string, data: ArticleToModel) => Promise<string>,
	delete: (id: string) => Promise<void>
}
