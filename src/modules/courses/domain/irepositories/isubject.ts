import { SubjectEntity } from '../entities/subject'
import { GetClauses } from '@modules/core/data/datasources/base'
import { SubjectToModel } from '../../data/models/subject'

export interface ISubjectRepository {
	add: (data: SubjectToModel) => Promise<string>
	update: (id:string, data: SubjectToModel) => Promise<string>
	get: (conditions?: GetClauses) => Promise<SubjectEntity[]>
	find: (id: string) => Promise<SubjectEntity | undefined>
	delete: (id: string) => Promise<void>
}
