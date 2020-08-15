import { ICourseRepository } from '@root/modules/courses/domain/irepositories/icourse'
import { CourseFactory } from '@root/modules/courses/domain/factories/course'

export class UpdateCourseUsecase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call (id: string, factory: CourseFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

}

