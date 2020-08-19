import Bottle from 'bottlejs'
import { TutorQuestionFirebaseDataSource } from '@root/modules/tests/data/datasources/tutorQuestion-firebase'
import { TutorQuestionTransformer } from '@root/modules/tests/data/transformers/tutorQuestion'
import { TutorQuestionRepository } from '@root/modules/tests/data/repositories/tutorQuestions'
import { GetTutorQuestionsByModuleUseCase } from '@root/modules/tests/domain/usecases/getTutorQuestionsByModule'

const bottle = new Bottle()

bottle.service('DataSources.TutorQuestion', TutorQuestionFirebaseDataSource)

bottle.service('Transformers.TutorQuestion', TutorQuestionTransformer)

bottle.service('Repositories.TutorQuestion', TutorQuestionRepository, 'DataSources.TutorQuestion','Transformers.TutorQuestion')

bottle.service('Usecases.TutorQuestion.GetByModule', GetTutorQuestionsByModuleUseCase, 'Repositories.TutorQuestion')

const {
	GetByModule: GetTutorQuestionsByModule
} = bottle.container.Usecases.TutorQuestion as {
	GetByModule: GetTutorQuestionsByModuleUseCase
}

export {
	GetTutorQuestionsByModule
}
