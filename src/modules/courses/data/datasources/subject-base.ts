import { GetClauses } from '@root/modules/core/data/datasources/base'
import { SubjectFromModel, SubjectToModel } from '@root/modules/courses/data/models/subject'

export abstract class SubjectBaseDataSource {
	public abstract add: (data: SubjectToModel) => Promise<string>
	public abstract get: (condition?: GetClauses) => Promise<SubjectFromModel[]>
	public abstract delete: (id: string) => Promise<void>
}
