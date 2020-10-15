import { NoteFirebaseDataSource } from '@modules/shop/data/datasources/note-firebase'
import { NoteTransformer } from '@modules/shop/data/transformers/note'
import { NoteRepository } from '@modules/shop/data/repositories/note'
import { GetNotesUseCase } from '@modules/shop/domain/usecases/getNotes'
import { FindNoteUsecase } from '@modules/shop/domain/usecases/findNote'
import { DeleteNoteUsecase } from '@modules/shop/domain/usecases/deleteNote'
import { GetNoteFactoryUseCase } from '@modules/shop/domain/usecases/getNoteFactory'
import { AddNoteUseCase } from '@modules/shop/domain/usecases/addNote'
import { UpdateNoteUseCase } from '@modules/shop/domain/usecases/updateNote'
import { CartFirebaseDataSource } from '@modules/shop/data/datasources/cart-firebase'
import { CartRepository } from '@modules/shop/data/repositories/cart'
import { SendCartToEmailUseCase } from '@modules/shop/domain/usecases/sendCartToEmail'
import { BuyMoreQuestionsUseCase } from '@modules/shop/domain/usecases/buyMoreQuestions'

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
