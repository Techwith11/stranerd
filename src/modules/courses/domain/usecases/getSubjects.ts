import { ISubjectRepository } from '@root/modules/courses/domain/irepositories/isubject'
import { SubjectEntity } from '@root/modules/courses/domain/entities/subject'
import { GetClauses } from '@root/modules/core/data/datasources/base'

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

