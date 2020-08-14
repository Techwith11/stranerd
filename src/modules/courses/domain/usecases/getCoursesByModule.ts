import { ICourseRepository } from '@root/modules/courses/domain/irepositories/icourse'
import { CourseEntity } from '@root/modules/courses/domain/entities/course'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class GetCoursesByModuleUseCase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call (subject: string, module: string) :Promise<CourseEntity[]> {
		const conditions: GetClauses = {
			order: {
				field: 'dates.createdAt',
				desc: true
			},
			where: [
				{ field: 'subject', condition: '==', value: subject },
				{ field: 'module', condition: '==', value: module },
			]
		}
		return await this.repository.get(conditions)
	}

}

