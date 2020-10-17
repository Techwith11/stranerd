import { TutorQuestionFirebaseDataSource } from './data/datasources/tutorQuestion-firebase'
import { QuestionTransformer } from './data/transformers/question'
import { QuestionRepository } from './data/repositories/question'
import { GetTutorQuestionsByModuleUseCase } from './domain/usecases/getTutorQuestionsByModule'
import { DeleteTutorQuestionUseCase } from './domain/usecases/deleteTutorQuestion'
import { GetQuestionFactoryUseCase } from './domain/usecases/getQuestionFactory'
import { AddTutorQuestionUseCase } from './domain/usecases/addTutorQuestion'
import { UpdateTutorQuestionUseCase } from './domain/usecases/updateTutorQuestion'
import { FindTutorQuestionUsecase } from './domain/usecases/findTutorQuestion'

const tutorQuestionDataSource = new TutorQuestionFirebaseDataSource()

const questionTransformer = new QuestionTransformer()

const tutorQuestionRepository = new QuestionRepository(tutorQuestionDataSource, questionTransformer)

export const GetQuestionFactory = new GetQuestionFactoryUseCase()

export const GetTutorQuestionsByModule = new GetTutorQuestionsByModuleUseCase(tutorQuestionRepository)
export const DeleteTutorQuestion = new DeleteTutorQuestionUseCase(tutorQuestionRepository)
export const AddTutorQuestion = new AddTutorQuestionUseCase(tutorQuestionRepository)
export const UpdateTutorQuestion = new UpdateTutorQuestionUseCase(tutorQuestionRepository)
export const FindTutorQuestion = new FindTutorQuestionUsecase(tutorQuestionRepository)
