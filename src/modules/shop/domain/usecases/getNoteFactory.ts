import { NoteFactory } from '../factories/note'

export class GetNoteFactoryUseCase {
	public call () :NoteFactory {
		return new NoteFactory()
	}

}
