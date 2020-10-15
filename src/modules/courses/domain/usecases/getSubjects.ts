import { ISubjectRepository } from '@modules/courses/domain/irepositories/isubject'
import { SubjectEntity } from '@modules/courses/domain/entities/subject'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetSubjectsUseCase {
	private repository: ISubjectRepository

	constructor(repository: ISubjectRepository) {
		this.repository = repository
	}

	public async call () :Promise<SubjectEntity[]> {
		const conditions: GetClauses = {
			order: {
				field: 'name',
				desc: false
			}
		}
		return await this.repository.get(conditions)
	}

}

