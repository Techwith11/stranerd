import { GetClauses } from '@modules/core/data/datasources/base'
import { QuestionFromModel, QuestionToModel } from '@modules/tests/data/models/question'

export abstract class QuestionBaseDataSource {
	public abstract create: (data: QuestionToModel) => Promise<string>
	public abstract get: (condition?: GetClauses) => Promise<QuestionFromModel[]>
	public abstract find: (id: string) => Promise<QuestionFromModel | undefined>
	public abstract update: (id: string, data: QuestionToModel) => Promise<string>
	public abstract delete: (id: string) => Promise<void>
}
