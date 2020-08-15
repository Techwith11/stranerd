import { ICourseRepository } from '@root/modules/courses/domain/irepositories/icourse'
import { CourseFactory } from '@root/modules/courses/domain/factories/course'

export class AddCourseUsecase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call (factory: CourseFactory) {
		console.log(factory.validValues)
		return '' // await this.repository.add(await factory.toModel())
	}

}

