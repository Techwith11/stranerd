import { ICourseRepository } from '@root/modules/courses/domain/irepositories/icourse'

export class DeleteCourseUseCase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call (id: string) {
		return await this.repository.delete(id)
	}

}

