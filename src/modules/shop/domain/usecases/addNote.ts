import { INoteRepository } from '@modules/shop/domain/irepositories/inote'
import { NoteFactory } from '@modules/shop/domain/factories/note'

export class AddNoteUseCase {
	private repository: INoteRepository

	constructor(repository: INoteRepository) {
		this.repository = repository
	}

	public async call (factory: NoteFactory) : Promise<string> {
		return await this.repository.add(await factory.toModel())
	}

}
