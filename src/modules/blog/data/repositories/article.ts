import { IArticleRepository } from '@root/modules/blog/domain/irepositories/iarticle'
import { ArticleBaseDataSource } from '@root/modules/blog/data/datasources/article-base'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { ArticleTransformer } from '@root/modules/blog/data/transformers/article'
import { ArticleFromModel, ArticleToModel } from '@root/modules/blog/data/models/article'

export class ArticleRepository implements IArticleRepository{
	private dataSource: ArticleBaseDataSource
	private transformer: ArticleTransformer

	constructor(dataSource: ArticleBaseDataSource, transformer: ArticleTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async add(data: ArticleToModel) {
		return await this.dataSource.create(data)
	}

	public async find(id: string) {
		const model = await this.dataSource.find(id)
		if(model) return this.transformer.fromJSON(model)
		else return undefined
	}

	public async get(conditions?: GetClauses) {
		const models = await this.dataSource.get(conditions)
		return models.map((model: ArticleFromModel) => this.transformer.fromJSON(model))
	}

	public async delete(id: string) {
		return await this.dataSource.delete(id)
	}

}
