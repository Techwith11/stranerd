import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { TutorQuestionBaseDataSource } from '@root/modules/tests/data/datasources/tutorQuestion-base'
import { TutorQuestionFromModel, TutorQuestionToModel } from '@root/modules/tests/data/models/tutorQuestion'

export class TutorQuestionFirebaseDataSource implements TutorQuestionBaseDataSource{

	public async create(article: TutorQuestionToModel): Promise<string> {
		return await FirestoreService.create('tests/tutors/questions', article)
	}

	public async find(id: string): Promise<TutorQuestionFromModel | undefined> {
		return await FirestoreService.find('tests/tutors/questions', id) as TutorQuestionFromModel | undefined
	}

	public async get(conditions?: GetClauses): Promise<TutorQuestionFromModel[]> {
		return await FirestoreService.get('tests/tutors/questions', conditions) as TutorQuestionFromModel[]
	}

	public async update(id: string, data: TutorQuestionToModel): Promise<string> {
		return await FirestoreService.update('tests/tutors/questions', id, data)
	}

	public async delete(id: string): Promise<void> {
		return await FirestoreService.delete('tests/tutors/questions', id)
	}

}
