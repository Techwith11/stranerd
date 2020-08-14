import { SubjectEntity } from '@root/modules/courses/domain/entities/subject'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { SubjectToModel } from '@root/modules/courses/data/models/subject'

export interface ISubjectRepository {
	add: (data: SubjectToModel) => Promise<string>
	update: (id:string, data: SubjectToModel) => Promise<string>
	get: (conditions?: GetClauses) => Promise<SubjectEntity[]>
	find: (id: string) => Promise<SubjectEntity | undefined>
	delete: (id: string) => Promise<void>
}
