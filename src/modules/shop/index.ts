import { NoteFirebaseDataSource } from './data/datasources/note-firebase'
import { NoteTransformer } from './data/transformers/note'
import { NoteRepository } from './data/repositories/note'
import { GetNotesUseCase } from './domain/usecases/getNotes'
import { FindNoteUsecase } from './domain/usecases/findNote'
import { DeleteNoteUsecase } from './domain/usecases/deleteNote'
import { GetNoteFactoryUseCase } from './domain/usecases/getNoteFactory'
import { AddNoteUseCase } from './domain/usecases/addNote'
import { UpdateNoteUseCase } from './domain/usecases/updateNote'
import { CartFirebaseDataSource } from './data/datasources/cart-firebase'
import { CartRepository } from './data/repositories/cart'
import { SendCartToEmailUseCase } from './domain/usecases/sendCartToEmail'
import { BuyMoreQuestionsUseCase } from './domain/usecases/buyMoreQuestions'

const noteDataSource = new NoteFirebaseDataSource()
const cartDataSource = new CartFirebaseDataSource()

const noteTransformer = new NoteTransformer()

const noteRepository = new NoteRepository(noteDataSource, noteTransformer)
const cartRepository = new CartRepository(cartDataSource, noteTransformer)

export const GetNotes = new GetNotesUseCase(noteRepository)
export const FindNote = new FindNoteUsecase(noteRepository)
export const DeleteNote = new DeleteNoteUsecase(noteRepository)
export const AddNote = new AddNoteUseCase(noteRepository)
export const UpdateNote = new UpdateNoteUseCase(noteRepository)
export const GetNoteFactory = new GetNoteFactoryUseCase()

export const SendCartToEmail = new SendCartToEmailUseCase(cartRepository)
export const BuyMoreQuestions = new BuyMoreQuestionsUseCase(cartRepository)
