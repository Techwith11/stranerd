import { IQuestionRepository } from '../irepositories/iquestion'

export class DeleteTutorQuestionUseCase {
	private repository: IQuestionRepository

	constructor(repository: IQuestionRepository) {
		this.repository = repository
	}

	public async call (id: string) {
		return await this.repository.delete(id)
	}

}

