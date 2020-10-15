import { FirestoreService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'
import { SubjectBaseDataSource } from '../datasources/subject-base'
import { SubjectFromModel, SubjectToModel } from '../models/subject'

export class SubjectFirebaseDataSource implements SubjectBaseDataSource{

	public async get(conditions?: GetClauses): Promise<SubjectFromModel[]> {
		return await FirestoreService.get('subjects', conditions) as SubjectFromModel[]
	}

	public async delete(id: string): Promise<void> {
		return await FirestoreService.delete('subjects', id)
	}

	public async add(data: SubjectToModel): Promise<string> {
		return await FirestoreService.create('subjects', data)
	}

	public async update(id: string, data: SubjectToModel): Promise<string> {
		return await FirestoreService.update('subjects', id, data)
	}

	public async find(id: string): Promise<SubjectFromModel | undefined> {
		return await FirestoreService.find('subjects', id)  as SubjectFromModel | undefined
	}

}
