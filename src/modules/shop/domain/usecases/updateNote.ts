import { INoteRepository } from '@root/modules/shop/domain/irepositories/inote'
import { NoteFactory } from '@root/modules/shop/domain/factories/note'

export class UpdateNoteUseCase {
	private repository: INoteRepository

	constructor(repository: INoteRepository) {
		this.repository = repository
	}

	public async call (id: string, factory: NoteFactory) :Promise<string> {
		return await this.repository.update(id, await factory.toModel())
	}

}
