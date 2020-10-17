import { QuestionEntity } from '../entities/question'
import { GetClauses } from '@modules/core/data/datasources/base'
import { QuestionToModel } from '../../data/models/question'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<string>,
	find: (id: string) => Promise<QuestionEntity | undefined>
	get: (conditions?: GetClauses) => Promise<QuestionEntity[]>
	update: (id: string, data: QuestionToModel) => Promise<string>,
	delete: (id: string) => Promise<void>
}
