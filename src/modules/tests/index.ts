import Bottle from 'bottlejs'
import { TutorQuestionFirebaseDataSource } from '@root/modules/tests/data/datasources/tutorQuestion-firebase'
import { QuestionTransformer } from '@root/modules/tests/data/transformers/question'
import { QuestionRepository } from '@root/modules/tests/data/repositories/question'
import { GetTutorQuestionsByModuleUseCase } from '@root/modules/tests/domain/usecases/getTutorQuestionsByModule'
import { DeleteTutorQuestionUseCase } from '@root/modules/tests/domain/usecases/deleteTutorQuestion'
import { GetQuestionFactoryUseCase } from '@root/modules/tests/domain/usecases/getQuestionFactory'
import { AddTutorQuestionUseCase } from '@root/modules/tests/domain/usecases/addTutorQuestion'
import { UpdateTutorQuestionUseCase } from '@root/modules/tests/domain/usecases/updateTutorQuestion'
import { FindTutorQuestionUsecase } from '@root/modules/tests/domain/usecases/findTutorQuestion'

const bottle = new Bottle()

bottle.service('DataSources.TutorQuestion', TutorQuestionFirebaseDataSource)

bottle.service('Transformers.Question', QuestionTransformer)

bottle.service('Repositories.TutorQuestion', QuestionRepository, 'DataSources.TutorQuestion','Transformers.Question')


bottle.service('Usecases.Question.GetFactory', GetQuestionFactoryUseCase)
bottle.service('Usecases.TutorQuestion.GetByModule', GetTutorQuestionsByModuleUseCase, 'Repositories.TutorQuestion')
bottle.service('Usecases.TutorQuestion.Delete', DeleteTutorQuestionUseCase, 'Repositories.TutorQuestion')
bottle.service('Usecases.TutorQuestion.Add', AddTutorQuestionUseCase, 'Repositories.TutorQuestion')
bottle.service('Usecases.TutorQuestion.Update', UpdateTutorQuestionUseCase, 'Repositories.TutorQuestion')
bottle.service('Usecases.TutorQuestion.Find', FindTutorQuestionUsecase, 'Repositories.TutorQuestion')

const { GetFactory: GetQuestionFactory } = bottle.container.Usecases.Question as {
	GetFactory: GetQuestionFactoryUseCase
}

const {
	GetByModule: GetTutorQuestionsByModule, Delete: DeleteTutorQuestion,
	Add: AddTutorQuestion, Update: UpdateTutorQuestion, Find: FindTutorQuestion
} = bottle.container.Usecases.TutorQuestion as {
	GetByModule: GetTutorQuestionsByModuleUseCase, Delete: DeleteTutorQuestionUseCase,
	Add: AddTutorQuestionUseCase, Update: UpdateTutorQuestionUseCase, Find: FindTutorQuestionUsecase
}

export {
	GetQuestionFactory,
	GetTutorQuestionsByModule, DeleteTutorQuestion, AddTutorQuestion, UpdateTutorQuestion, FindTutorQuestion
}
