import { ISubjectRepository } from '../irepositories/isubject'
import { SubjectFactory } from '../factories/subject'

export class AddSubjectUsecase {
	private repository: ISubjectRepository

	constructor(repository: ISubjectRepository) {
		this.repository = repository
	}

	public async call (factory: SubjectFactory) {
		return await this.repository.add(await factory.toModel())
	}

}

