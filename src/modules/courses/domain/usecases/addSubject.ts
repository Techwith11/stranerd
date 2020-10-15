import { ISubjectRepository } from '@modules/courses/domain/irepositories/isubject'
import { SubjectFactory } from '@modules/courses/domain/factories/subject'

export class AddSubjectUsecase {
	private repository: ISubjectRepository

	constructor(repository: ISubjectRepository) {
		this.repository = repository
	}

	public async call (factory: SubjectFactory) {
		return await this.repository.add(await factory.toModel())
	}

}

