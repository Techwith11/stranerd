import { GetClauses } from '@modules/core/data/datasources/base'
import { CourseFromModel, CourseToModel } from '@modules/courses/data/models/course'

export abstract class CourseBaseDataSource {
	public abstract add: (data: CourseToModel) => Promise<string>
	public abstract update: (id: string, data: CourseToModel) => Promise<string>
	public abstract get: (condition?: GetClauses) => Promise<CourseFromModel[]>
	public abstract find: (id: string) => Promise<CourseFromModel | undefined>
	public abstract delete: (id: string) => Promise<void>
}
