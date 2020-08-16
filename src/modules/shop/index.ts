import Bottle from 'bottlejs'
import { NoteFirebaseDataSource } from '@root/modules/shop/data/datasources/note-firebase'
import { NoteTransformer } from '@root/modules/shop/data/transformers/note'
import { NoteRepository } from '@root/modules/shop/data/repositories/note'
import { GetNotesUseCase } from '@root/modules/shop/domain/usecases/getNotes'

const bottle = new Bottle()

bottle.service('DataSources.Note', NoteFirebaseDataSource)

bottle.service('Transformers.Note', NoteTransformer)

bottle.service('Repositories.Note', NoteRepository, 'DataSources.Note','Transformers.Note')

bottle.service('Usecases.Note.Get', GetNotesUseCase, 'Repositories.Note')

const {
	Get: GetNotes
}  = bottle.container.Usecases.Note as {
	Get: GetNotesUseCase
}

export {
	GetNotes
}
