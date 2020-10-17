import { INoteRepository } from '../irepositories/inote'
import { NoteFactory } from '../factories/note'

export class AddNoteUseCase {
	private repository: INoteRepository

	constructor(repository: INoteRepository) {
		this.repository = repository
	}

	public async call (factory: NoteFactory) : Promise<string> {
		return await this.repository.add(await factory.toModel())
	}

}
