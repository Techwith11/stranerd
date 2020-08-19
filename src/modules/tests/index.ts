import Bottle from 'bottlejs'
import { TutorQuestionFirebaseDataSource } from '@root/modules/tests/data/datasources/tutorQuestion-firebase'
import { QuestionTransformer } from '@root/modules/tests/data/transformers/question'
import { QuestionRepository } from '@root/modules/tests/data/repositories/question'
import { GetTutorQuestionsByModuleUseCase } from '@root/modules/tests/domain/usecases/getTutorQuestionsByModule'

const bottle = new Bottle()

bottle.service('DataSources.TutorQuestion', TutorQuestionFirebaseDataSource)

bottle.service('Transformers.Question', QuestionTransformer)

bottle.service('Repositories.TutorQuestion', QuestionRepository, 'DataSources.TutorQuestion','Transformers.Question')

bottle.service('Usecases.TutorQuestion.GetByModule', GetTutorQuestionsByModuleUseCase, 'Repositories.TutorQuestion')

const {
	GetByModule: GetTutorQuestionsByModule
} = bottle.container.Usecases.TutorQuestion as {
	GetByModule: GetTutorQuestionsByModuleUseCase
}

export {
	GetTutorQuestionsByModule
}
