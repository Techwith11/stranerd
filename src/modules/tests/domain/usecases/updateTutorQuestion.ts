import { IQuestionRepository } from '@root/modules/tests/domain/irepositories/iquestion'
import { QuestionFactory } from '@root/modules/tests/domain/factories/question'

export class UpdateTutorQuestionUseCase {
	private repository: IQuestionRepository

	constructor(repository: IQuestionRepository) {
		this.repository = repository
	}

	public async call (id: string, factory: QuestionFactory) :Promise<string> {
		return await this.repository.update(id, await factory.toModel())
	}

}
