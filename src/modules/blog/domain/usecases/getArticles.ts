import { IArticleRepository } from '../irepositories/iarticle'
import { ArticleEntity } from '../entities/article'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetArticlesUseCase {
	private repository: IArticleRepository

	constructor(repository: IArticleRepository) {
		this.repository = repository
	}

	public async call (date?: Date) :Promise<ArticleEntity[]> {
		const conditions: GetClauses = {
			order: {
				field: 'dates.createdAt',
				desc: true
			},
			limit: parseInt(process.env.VUE_APP_PAGINATION_LIMIT)
		}
		if(date){
			conditions.where = [
				{
					field: 'dates.createdAt',
					condition: '<',
					value: date
				}
			]
		}
		return await this.repository.get(conditions)
	}

}

