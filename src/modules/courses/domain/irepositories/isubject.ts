import { SubjectEntity } from '@modules/courses/domain/entities/subject'
import { GetClauses } from '@modules/core/data/datasources/base'
import { SubjectToModel } from '@modules/courses/data/models/subject'

export interface ISubjectRepository {
	add: (data: SubjectToModel) => Promise<string>
	update: (id:string, data: SubjectToModel) => Promise<string>
	get: (conditions?: GetClauses) => Promise<SubjectEntity[]>
	find: (id: string) => Promise<SubjectEntity | undefined>
	delete: (id: string) => Promise<void>
}
