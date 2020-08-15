import { ICourseRepository } from '@root/modules/courses/domain/irepositories/icourse'

export class DeleteCourseUseCase {
	private repository: ICourseRepository

	constructor(repository: ICourseRepository) {
		this.repository = repository
	}

	public async call (id: string) {
		await new Promise(resolve => setTimeout(resolve, 3000))
		console.log('Deleted')
		//return await this.repository.delete(id)
	}

}

