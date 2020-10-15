import { FirestoreService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { CourseBaseDataSource } from '@modules/courses/data/datasources/course-base'
import { CourseFromModel, CourseToModel } from '@modules/courses/data/models/course'

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
