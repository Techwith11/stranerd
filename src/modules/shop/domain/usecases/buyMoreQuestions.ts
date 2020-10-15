import { ICartRepository } from '../irepositories/icart'

export class BuyMoreQuestionsUseCase {
	private repository: ICartRepository

	constructor(repository: ICartRepository) {
		this.repository = repository
	}

	public async call (id: string, questions: number) : Promise<void> {
		return await this.repository.buyMoreQuestions(id, questions)
	}

}
