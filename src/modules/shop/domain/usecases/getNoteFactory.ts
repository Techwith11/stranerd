import { NoteFactory } from '@modules/shop/domain/factories/note'

export class GetNoteFactoryUseCase {
	public call () :NoteFactory {
		return new NoteFactory()
	}

}
