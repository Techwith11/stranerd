import { INoteRepository } from '@root/modules/shop/domain/irepositories/inote'
import { NoteFactory } from '@root/modules/shop/domain/factories/note'

export class AddNoteUseCase {
	private repository: INoteRepository

	constructor(repository: INoteRepository) {
		this.repository = repository
	}

	public async call (factory: NoteFactory) : Promise<string> {
		return await this.repository.add(await factory.toModel())
	}

}
