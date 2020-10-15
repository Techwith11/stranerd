import { ICourseRepository } from '@modules/courses/domain/irepositories/icourse'
import { CourseFactory } from '@modules/courses/domain/factories/course'

export class AddCourseUsecase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call (factory: CourseFactory) {
		return await this.repository.add(await factory.toModel())
	}

}

