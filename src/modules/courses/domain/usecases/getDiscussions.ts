import { IDiscussionRepository } from '@root/modules/courses/domain/irepositories/idiscussion'
import { DiscussionEntity } from '@root/modules/courses/domain/entities/discussion'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class GetDiscussionsUsecase {
	private repository: IDiscussionRepository

	constructor(repository: IDiscussionRepository) {
		this.repository = repository
	}


	public async call (courseId: string, date?: Date) :Promise<DiscussionEntity[]> {
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
		return await this.repository.get(courseId, conditions)
	}
}


