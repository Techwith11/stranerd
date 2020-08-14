import { CourseEntity } from '@root/modules/courses/domain/entities/course'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { CourseToModel } from '@root/modules/courses/data/models/course'

export interface ICourseRepository {
	add: (data: CourseToModel) => Promise<string>
	update: (id:string, data: CourseToModel) => Promise<string>
	get: (conditions?: GetClauses) => Promise<CourseEntity[]>
	find: (id: string) => Promise<CourseEntity | undefined>
	delete: (id: string) => Promise<void>
}
