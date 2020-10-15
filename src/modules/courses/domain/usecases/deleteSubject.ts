import { ISubjectRepository } from '@modules/courses/domain/irepositories/isubject'

export class DeleteSubjectUseCase {
	private repository: ISubjectRepository

	constructor(repository: ISubjectRepository) {
		this.repository = repository
	}

	public async call (id: string) {
		return await this.repository.delete(id)
	}

}

