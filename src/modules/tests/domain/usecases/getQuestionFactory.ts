import { QuestionFactory } from '../factories/question'

export class GetQuestionFactoryUseCase {
	public call () :QuestionFactory {
		return new QuestionFactory()
	}
}

