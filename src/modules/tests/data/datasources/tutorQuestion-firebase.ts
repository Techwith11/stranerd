import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { QuestionBaseDataSource } from '@root/modules/tests/data/datasources/question-base'
import { QuestionFromModel, QuestionToModel } from '@root/modules/tests/data/models/question'

export class TutorQuestionFirebaseDataSource implements QuestionBaseDataSource{

	public async create(article: QuestionToModel): Promise<string> {
		return await FirestoreService.create('tests/tutors/questions', article)
	}

	public async find(id: string): Promise<QuestionFromModel | undefined> {
		return await FirestoreService.find('tests/tutors/questions', id) as QuestionFromModel | undefined
	}

	public async get(conditions?: GetClauses): Promise<QuestionFromModel[]> {
		return await FirestoreService.get('tests/tutors/questions', conditions) as QuestionFromModel[]
	}

	public async update(id: string, data: QuestionToModel): Promise<string> {
		return await FirestoreService.update('tests/tutors/questions', id, data)
	}

	public async delete(id: string): Promise<void> {
		return await FirestoreService.delete('tests/tutors/questions', id)
	}

}
