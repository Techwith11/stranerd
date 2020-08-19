import { GetClauses } from '@root/modules/core/data/datasources/base'
import { TutorQuestionFromModel, TutorQuestionToModel } from '@root/modules/tests/data/models/tutorQuestion'

export abstract class TutorQuestionBaseDataSource {
	public abstract create: (data: TutorQuestionToModel) => Promise<string>
	public abstract get: (condition?: GetClauses) => Promise<TutorQuestionFromModel[]>
	public abstract find: (id: string) => Promise<TutorQuestionFromModel | undefined>
	public abstract update: (id: string, data: TutorQuestionToModel) => Promise<string>
	public abstract delete: (id: string) => Promise<void>
}
