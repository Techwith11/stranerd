import { SubjectEntity } from '@root/modules/courses/domain/entities/subject'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { SubjectToModel } from '@root/modules/courses/data/models/subject'

export interface ISubjectRepository {
	add: (data: SubjectToModel) => Promise<String>
	get: (conditions?: GetClauses) => Promise<SubjectEntity[]>
	delete: (id: string) => Promise<void>
}
