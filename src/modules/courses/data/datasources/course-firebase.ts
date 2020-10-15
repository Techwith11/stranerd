import { FirestoreService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { CourseBaseDataSource } from './course-base'
import { CourseFromModel, CourseToModel } from '../models/course'

export class CourseFirebaseDataSource implements CourseBaseDataSource{

	public async get(conditions?: GetClauses): Promise<CourseFromModel[]> {
		return await FirestoreService.get('courses', conditions) as CourseFromModel[]
	}

	public async delete(id: string): Promise<void> {
		return await FirestoreService.delete('courses', id)
	}

	public async add(data: CourseToModel): Promise<string> {
		return await FirestoreService.create('courses', data)
	}

	public async update(id: string, data: CourseToModel): Promise<string> {
		return await FirestoreService.update('courses', id, data)
	}

	public async find(id: string): Promise<CourseFromModel | undefined> {
		return await FirestoreService.find('courses', id)  as CourseFromModel | undefined
	}

}
