import { ICourseRepository } from '@root/modules/courses/domain/irepositories/icourse'

export class FindCourseUsecase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call (id: string) {
		return await this.repository.find(id)
	}

}

