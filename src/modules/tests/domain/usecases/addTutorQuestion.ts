import { IQuestionRepository } from '../irepositories/iquestion'
import { QuestionFactory } from '../factories/question'

export class AddTutorQuestionUseCase {
	private repository: IQuestionRepository

	constructor(repository: IQuestionRepository) {
		this.repository = repository
	}

	public async call (factory: QuestionFactory) : Promise<string> {
		return await this.repository.add(await factory.toModel())
	}

}
