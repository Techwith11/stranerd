import Bottle from 'bottlejs'
import { SubjectFirebaseDataSource } from '@root/modules/courses/data/datasources/subject-firebase'
import { SubjectTransformer } from '@root/modules/courses/data/transformers/subject'
import { SubjectRepository } from '@root/modules/courses/data/repositories/subject'
import { GetSubjectsUseCase } from '@root/modules/courses/domain/usecases/getSubjects'
import { DeleteSubjectUseCase } from '@root/modules/courses/domain/usecases/deleteSubject'
import { GetSubjectFactoryUsecase } from '@root/modules/courses/domain/usecases/getSubjectFactory'

const bottle = new Bottle()

bottle.service('DataSources.Subject', SubjectFirebaseDataSource)

bottle.service('Transformers.Subject', SubjectTransformer)

bottle.service('Repositories.Subject', SubjectRepository, 'DataSources.Subject','Transformers.Subject')

bottle.service('Usecases.Subject.Get', GetSubjectsUseCase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Delete', DeleteSubjectUseCase, 'Repositories.Subject')
bottle.service('Usecases.Subject.GetFactory', GetSubjectFactoryUsecase)

const { Get: GetSubjects, Delete: DeleteSubject, GetFactory: GetSubjectFactory } = bottle.container.Usecases.Subject as {
	Get: GetSubjectsUseCase, Delete: DeleteSubjectUseCase,
	GetFactory: GetSubjectFactoryUsecase
}

export {
	GetSubjects, DeleteSubject, GetSubjectFactory
}
