import { INoteRepository } from '../irepositories/inote'

export class DeleteNoteUsecase {
	private repository: INoteRepository

	constructor(repository: INoteRepository) {
		this.repository = repository
	}

	public async call (id: string) :Promise<void> {
		return await this.repository.delete(id)
	}

}

