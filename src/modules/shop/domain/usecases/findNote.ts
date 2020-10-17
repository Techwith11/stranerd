import { INoteRepository } from '../irepositories/inote'
import { NoteEntity } from '../entities/note'

export class FindNoteUsecase {
	private repository: INoteRepository

	constructor(repository: INoteRepository) {
		this.repository = repository
	}

	public async call (id: string) :Promise<NoteEntity | undefined> {
		return await this.repository.find(id)
	}

}

