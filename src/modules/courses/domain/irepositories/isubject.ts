import { SubjectEntity } from '@root/modules/courses/domain/entities/subject'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export interface ISubjectRepository {
	get: (conditions?: GetClauses) => Promise<SubjectEntity[]>
	delete: (id: string) => Promise<void>
}
