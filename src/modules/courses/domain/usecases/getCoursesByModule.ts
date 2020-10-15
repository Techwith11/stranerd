import { ICourseRepository } from '@modules/courses/domain/irepositories/icourse'
import { CourseEntity } from '@modules/courses/domain/entities/course'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetCoursesByModuleUseCase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call (subject: string, module: string, date?: Date) :Promise<CourseEntity[]> {
		const conditions: GetClauses = {
			limit: parseInt(process.env.VUE_APP_PAGINATION_LIMIT),
			order: {
				field: 'dates.createdAt',
				desc: true
			},
			where: [
				{ field: 'subject', condition: '==', value: subject.toLowerCase() },
				{ field: 'module', condition: '==', value: module.toLowerCase() },
			]
		}
		if(date){
			conditions.where!.push({ field: 'dates.createdAt', condition: '<', value: date })
		}
		return await this.repository.get(conditions)
	}

}

