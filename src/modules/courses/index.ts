import Bottle from 'bottlejs'
import { SubjectFirebaseDataSource } from '@root/modules/courses/data/datasources/subject-firebase'
import { SubjectTransformer } from '@root/modules/courses/data/transformers/subject'
import { SubjectRepository } from '@root/modules/courses/data/repositories/subject'
import { GetSubjectsUseCase } from '@root/modules/courses/domain/usecases/getSubjects'

const bottle = new Bottle()

bottle.service('DataSources.Subject', SubjectFirebaseDataSource)

bottle.service('Transformers.Subject', SubjectTransformer)

bottle.service('Repositories.Subject', SubjectRepository, 'DataSources.Subject','Transformers.Subject')

bottle.service('Usecases.Subject.Get', GetSubjectsUseCase, 'Repositories.Subject')

const { Get: GetSubjects } = bottle.container.Usecases.Subject as {
	Get: GetSubjectsUseCase
}

export {
	GetSubjects
}
