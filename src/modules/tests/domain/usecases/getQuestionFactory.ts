import { QuestionFactory } from '@modules/tests/domain/factories/question'

export class GetQuestionFactoryUseCase {
	public call () :QuestionFactory {
		return new QuestionFactory()
	}
}

