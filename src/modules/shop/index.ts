import Bottle from 'bottlejs'
import { NoteFirebaseDataSource } from '@root/modules/shop/data/datasources/note-firebase'
import { NoteTransformer } from '@root/modules/shop/data/transformers/note'
import { NoteRepository } from '@root/modules/shop/data/repositories/note'
import { GetNotesUseCase } from '@root/modules/shop/domain/usecases/getNotes'
import { FindNoteUsecase } from '@root/modules/shop/domain/usecases/findNote'
import { DeleteNoteUsecase } from '@root/modules/shop/domain/usecases/deleteNote'
import { GetNoteFactoryUseCase } from '@root/modules/shop/domain/usecases/getNoteFactory'
import { AddNoteUseCase } from '@root/modules/shop/domain/usecases/addNote'
import { UpdateNoteUseCase } from '@root/modules/shop/domain/usecases/updateNote'
import { CartFirebaseDataSource } from '@root/modules/shop/data/datasources/cart-firebase'
import { CartRepository } from '@root/modules/shop/data/repositories/cart'
import { SendCartToEmailUseCase } from '@root/modules/shop/domain/usecases/sendCartToEmail'
import { BuyMoreQuestionsUseCase } from '@root/modules/shop/domain/usecases/buyMoreQuestions'

const bottle = new Bottle()

bottle.service('DataSources.Note', NoteFirebaseDataSource)
bottle.service('DataSources.Cart', CartFirebaseDataSource)

bottle.service('Transformers.Note', NoteTransformer)

bottle.service('Repositories.Note', NoteRepository, 'DataSources.Note','Transformers.Note')
bottle.service('Repositories.Cart', CartRepository, 'DataSources.Cart','Transformers.Note')

bottle.service('Usecases.Note.Get', GetNotesUseCase, 'Repositories.Note')
bottle.service('Usecases.Note.Find', FindNoteUsecase, 'Repositories.Note')
bottle.service('Usecases.Note.Add', AddNoteUseCase, 'Repositories.Note')
bottle.service('Usecases.Note.Update', UpdateNoteUseCase, 'Repositories.Note')
bottle.service('Usecases.Note.Delete', DeleteNoteUsecase, 'Repositories.Note')
bottle.service('Usecases.Note.GetFactory', GetNoteFactoryUseCase)

bottle.service('Usecases.Cart.SendCartToEmail', SendCartToEmailUseCase, 'Repositories.Cart')
bottle.service('Usecases.Cart.BuyMoreQuestions', BuyMoreQuestionsUseCase, 'Repositories.Cart')

const {
	Get: GetNotes, Find: FindNote, Delete: DeleteNote, GetFactory: GetNoteFactory,
	Add: AddNote, Update: UpdateNote
}  = bottle.container.Usecases.Note as {
	Get: GetNotesUseCase, Find: FindNoteUsecase, Delete: DeleteNoteUsecase, GetFactory: GetNoteFactoryUseCase,
	Add: AddNoteUseCase, Update: UpdateNoteUseCase
}

const {
	SendCartToEmail, BuyMoreQuestions
} = bottle.container.Usecases.Cart as {
	SendCartToEmail: SendCartToEmailUseCase, BuyMoreQuestions: BuyMoreQuestionsUseCase
}

export {
	GetNotes, FindNote, DeleteNote, GetNoteFactory, AddNote, UpdateNote,
	SendCartToEmail, BuyMoreQuestions
}
