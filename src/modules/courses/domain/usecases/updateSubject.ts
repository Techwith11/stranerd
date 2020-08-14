import { ISubjectRepository } from '@root/modules/courses/domain/irepositories/isubject'
import { SubjectFactory } from '@root/modules/courses/domain/factories/subject'

export class UpdateSubjectUsecase {
	private repository: ISubjectRepository

	constructor(repository: ISubjectRepository) {
		this.repository = repository
	}

	public async call (id: string, factory: SubjectFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

}

