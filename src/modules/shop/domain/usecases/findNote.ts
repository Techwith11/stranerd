import { INoteRepository } from '@root/modules/shop/domain/irepositories/inote'
import { NoteEntity } from '@root/modules/shop/domain/entities/note'

export class FindNoteUsecase {
	private repository: INoteRepository

	constructor(repository: INoteRepository) {
		this.repository = repository
	}

	public async call (id: string) :Promise<NoteEntity | undefined> {
		return await this.repository.find(id)
	}

}
