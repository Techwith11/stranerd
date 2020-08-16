import { NoteFactory } from '@root/modules/shop/domain/factories/note'

export class GetNoteFactoryUseCase {
	public call (date?: Date) :NoteFactory {
		return new NoteFactory()
	}

}
