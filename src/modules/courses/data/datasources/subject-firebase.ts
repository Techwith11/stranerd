import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { SubjectBaseDataSource } from '@root/modules/courses/data/datasources/subject-base'
import { SubjectFromModel } from '@root/modules/courses/data/models/subject'

export class SubjectFirebaseDataSource implements SubjectBaseDataSource{

	public async get(conditions?: GetClauses): Promise<SubjectFromModel[]> {
		return await FirestoreService.get('subjects', conditions) as SubjectFromModel[]
	}

}
