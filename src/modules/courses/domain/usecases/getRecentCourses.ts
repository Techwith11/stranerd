import { ICourseRepository } from '@modules/courses/domain/irepositories/icourse'
import { CourseEntity } from '@modules/courses/domain/entities/course'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetRecentCoursesUsecase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call () :Promise<CourseEntity[]> {
		const conditions: GetClauses = {
			limit: 1,
			order: {
				field: 'dates.createdAt',
				desc: true
			}
		}
		return await this.repository.get(conditions)
	}

}
