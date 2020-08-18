import { IDiscussionRepository } from '@root/modules/courses/domain/irepositories/idiscussion'
import { DiscussionEntity } from '@root/modules/courses/domain/entities/discussion'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class ListenToDiscussionsUsecase {
	private repository: IDiscussionRepository

	constructor(repository: IDiscussionRepository) {
		this.repository = repository
	}

	public async call (courseId: string, callback: (entities: DiscussionEntity[]) => void, date?: Date) :Promise<() => void > {
		const conditions: GetClauses = {
			order: {
				field: 'dates.createdAt',
				desc: true
			}
		}
		if(date){
			conditions.where = [
				{
					field: 'dates.createdAt',
					condition: '>',
					value: date
				}
			]
		}
		return await this.repository.listen(courseId,callback, conditions)
	}

}

