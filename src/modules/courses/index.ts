import Bottle from 'bottlejs'
import { SubjectFirebaseDataSource } from '@root/modules/courses/data/datasources/subject-firebase'
import { SubjectTransformer } from '@root/modules/courses/data/transformers/subject'
import { SubjectRepository } from '@root/modules/courses/data/repositories/subject'
import { GetSubjectsUseCase } from '@root/modules/courses/domain/usecases/getSubjects'
import { DeleteSubjectUseCase } from '@root/modules/courses/domain/usecases/deleteSubject'
import { GetSubjectFactoryUsecase } from '@root/modules/courses/domain/usecases/getSubjectFactory'
import { AddSubjectUsecase } from '@root/modules/courses/domain/usecases/addSubject'
import { UpdateSubjectUsecase } from '@root/modules/courses/domain/usecases/updateSubject'
import { FindSubjectUsecase } from '@root/modules/courses/domain/usecases/findSubject'

const bottle = new Bottle()

bottle.service('DataSources.Subject', SubjectFirebaseDataSource)

bottle.service('Transformers.Subject', SubjectTransformer)

bottle.service('Repositories.Subject', SubjectRepository, 'DataSources.Subject','Transformers.Subject')

bottle.service('Usecases.Subject.Add', AddSubjectUsecase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Get', GetSubjectsUseCase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Find', FindSubjectUsecase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Update', UpdateSubjectUsecase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Delete', DeleteSubjectUseCase, 'Repositories.Subject')
bottle.service('Usecases.Subject.GetFactory', GetSubjectFactoryUsecase)

const {
	Get: GetSubjects, Delete: DeleteSubject, GetFactory: GetSubjectFactory,
	Add: AddSubject, Update: UpdateSubject, Find: FindSubject
} = bottle.container.Usecases.Subject as {
	Get: GetSubjectsUseCase, Delete: DeleteSubjectUseCase,
	GetFactory: GetSubjectFactoryUsecase, Add: AddSubjectUsecase,
	Update: UpdateSubjectUsecase, Find: FindSubjectUsecase
}

export {
	GetSubjects, DeleteSubject, GetSubjectFactory, AddSubject, UpdateSubject, FindSubject
}
