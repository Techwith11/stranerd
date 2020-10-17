import { IPostRepository } from '../irepositories/ipost'
import { PostEntity } from '../entities/post'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetPostsUseCase {
	private repository: IPostRepository

	constructor(repository: IPostRepository) {
		this.repository = repository
	}

	public async call (date?: Date) :Promise<PostEntity[]> {
		const conditions: GetClauses = {
			order: {
				field: 'dates.createdAt',
				desc: true
			},
			limit: parseInt(process.env.VUE_APP_PAGINATION_LIMIT) + 1
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

