import { NoteFactory } from '@root/modules/shop/domain/factories/note'

export class GetNoteFactoryUseCase {
	public call () :NoteFactory {
		return new NoteFactory()
	}

}
