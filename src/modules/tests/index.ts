import { TutorQuestionFirebaseDataSource } from '@root/modules/tests/data/datasources/tutorQuestion-firebase'
import { QuestionTransformer } from '@root/modules/tests/data/transformers/question'
import { QuestionRepository } from '@root/modules/tests/data/repositories/question'
import { GetTutorQuestionsByModuleUseCase } from '@root/modules/tests/domain/usecases/getTutorQuestionsByModule'
import { DeleteTutorQuestionUseCase } from '@root/modules/tests/domain/usecases/deleteTutorQuestion'
import { GetQuestionFactoryUseCase } from '@root/modules/tests/domain/usecases/getQuestionFactory'
import { AddTutorQuestionUseCase } from '@root/modules/tests/domain/usecases/addTutorQuestion'
import { UpdateTutorQuestionUseCase } from '@root/modules/tests/domain/usecases/updateTutorQuestion'
import { FindTutorQuestionUsecase } from '@root/modules/tests/domain/usecases/findTutorQuestion'

const tutorQuestionDataSource = new TutorQuestionFirebaseDataSource()

const questionTransformer = new QuestionTransformer()

const tutorQuestionRepository = new QuestionRepository(tutorQuestionDataSource, questionTransformer)

export const GetQuestionFactory = new GetQuestionFactoryUseCase()

export const GetTutorQuestionsByModule = new GetTutorQuestionsByModuleUseCase(tutorQuestionRepository)
export const DeleteTutorQuestion = new DeleteTutorQuestionUseCase(tutorQuestionRepository)
export const AddTutorQuestion = new AddTutorQuestionUseCase(tutorQuestionRepository)
export const UpdateTutorQuestion = new UpdateTutorQuestionUseCase(tutorQuestionRepository)
export const FindTutorQuestion = new FindTutorQuestionUsecase(tutorQuestionRepository)
