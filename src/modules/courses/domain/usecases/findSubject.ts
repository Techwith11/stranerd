import { ISubjectRepository } from '@modules/courses/domain/irepositories/isubject'

export class FindSubjectUsecase {
	private repository: ISubjectRepository

	constructor(repository: ISubjectRepository) {
		this.repository = repository
	}

	public async call (id: string) {
		return await this.repository.find(id)
	}

}

