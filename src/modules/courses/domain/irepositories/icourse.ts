import { CourseEntity } from '../entities/course'
import { GetClauses } from '@modules/core/data/datasources/base'
import { CourseToModel } from '../../data/models/course'

export interface ICourseRepository {
	add: (data: CourseToModel) => Promise<string>
	update: (id:string, data: CourseToModel) => Promise<string>
	get: (conditions?: GetClauses) => Promise<CourseEntity[]>
	find: (id: string) => Promise<CourseEntity | undefined>
	delete: (id: string) => Promise<void>
}
