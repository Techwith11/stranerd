import { IQuestionRepository } from '../irepositories/iquestion'

export class FindTutorQuestionUsecase {
	private repository: IQuestionRepository

	constructor(repository: IQuestionRepository) {
		this.repository = repository
	}

	public async call (id: string) {
		return await this.repository.find(id)
	}

}
