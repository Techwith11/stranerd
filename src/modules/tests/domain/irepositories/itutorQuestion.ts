import { TutorQuestionEntity } from '@root/modules/tests/domain/entities/tutorQuestion'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { TutorQuestionToModel } from '@root/modules/tests/data/models/tutorQuestion'

export interface ITutorQuestionRepository {
	add: (data: TutorQuestionToModel) => Promise<string>,
	find: (id: string) => Promise<TutorQuestionEntity | undefined>
	get: (conditions?: GetClauses) => Promise<TutorQuestionEntity[]>
	update: (id: string, data: TutorQuestionToModel) => Promise<string>,
	delete: (id: string) => Promise<void>
}
