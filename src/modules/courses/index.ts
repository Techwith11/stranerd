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
import { CourseFirebaseDataSource } from '@root/modules/courses/data/datasources/course-firebase'
import { CourseTransformer } from '@root/modules/courses/data/transformers/course'
import { CourseRepository } from '@root/modules/courses/data/repositories/course'
import { GetCoursesByModuleUseCase } from '@root/modules/courses/domain/usecases/getCoursesByModule'
import { DeleteCourseUseCase } from '@root/modules/courses/domain/usecases/deleteCourse'
import { FindCourseUsecase } from '@root/modules/courses/domain/usecases/findCourse'
import { AddCourseUsecase } from '@root/modules/courses/domain/usecases/addCourse'
import { GetCourseFactoryUsecase } from '@root/modules/courses/domain/usecases/getCourseFactory'
import { UpdateCourseUsecase } from '@root/modules/courses/domain/usecases/updateCourse'
import { GetRecentCoursesUsecase } from '@root/modules/courses/domain/usecases/getRecentCourses'
import { DiscussionFirebaseDataSource } from '@root/modules/courses/data/datasources/discussion-firebase'
import { DiscussionTransformer } from '@root/modules/courses/data/transformers/discussion'
import { DiscussionRepository } from '@root/modules/courses/data/repositories/discussion'
import { GetDiscussionFactoryUsecase } from '@root/modules/courses/domain/usecases/getDiscussionFactory'
import { AddDiscussionUsecase } from '@root/modules/courses/domain/usecases/addDiscussion'
import { GetDiscussionsUsecase } from '@root/modules/courses/domain/usecases/getDiscussions'
import { ListenToDiscussionsUsecase } from '@root/modules/courses/domain/usecases/listenToDiscussions'

const bottle = new Bottle()

bottle.service('DataSources.Subject', SubjectFirebaseDataSource)
bottle.service('DataSources.Course', CourseFirebaseDataSource)
bottle.service('DataSources.Discussion', DiscussionFirebaseDataSource)

bottle.service('Transformers.Subject', SubjectTransformer)
bottle.service('Transformers.Course', CourseTransformer)
bottle.service('Transformers.Discussion', DiscussionTransformer)

bottle.service('Repositories.Subject', SubjectRepository, 'DataSources.Subject','Transformers.Subject')
bottle.service('Repositories.Course', CourseRepository, 'DataSources.Course','Transformers.Course')
bottle.service('Repositories.Discussion', DiscussionRepository, 'DataSources.Discussion','Transformers.Discussion')

bottle.service('Usecases.Subject.Add', AddSubjectUsecase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Get', GetSubjectsUseCase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Find', FindSubjectUsecase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Update', UpdateSubjectUsecase, 'Repositories.Subject')
bottle.service('Usecases.Subject.Delete', DeleteSubjectUseCase, 'Repositories.Subject')
bottle.service('Usecases.Subject.GetFactory', GetSubjectFactoryUsecase)
bottle.service('Usecases.Course.GetByModule', GetCoursesByModuleUseCase, 'Repositories.Course')
bottle.service('Usecases.Course.Find', FindCourseUsecase, 'Repositories.Course')
bottle.service('Usecases.Course.Delete', DeleteCourseUseCase, 'Repositories.Course')
bottle.service('Usecases.Course.Add', AddCourseUsecase, 'Repositories.Course')
bottle.service('Usecases.Course.Update', UpdateCourseUsecase, 'Repositories.Course')
bottle.service('Usecases.Course.GetRecent', GetRecentCoursesUsecase, 'Repositories.Course')
bottle.service('Usecases.Course.GetFactory', GetCourseFactoryUsecase)
bottle.service('Usecases.Discussion.Add', AddDiscussionUsecase, 'Repositories.Discussion')
bottle.service('Usecases.Discussion.Get', GetDiscussionsUsecase, 'Repositories.Discussion')
bottle.service('Usecases.Discussion.Listen', ListenToDiscussionsUsecase, 'Repositories.Discussion')
bottle.service('Usecases.Discussion.GetFactory', GetDiscussionFactoryUsecase)

const {
	Get: GetSubjects, Delete: DeleteSubject, GetFactory: GetSubjectFactory,
	Add: AddSubject, Update: UpdateSubject, Find: FindSubject
} = bottle.container.Usecases.Subject as {
	Get: GetSubjectsUseCase, Delete: DeleteSubjectUseCase,
	GetFactory: GetSubjectFactoryUsecase, Add: AddSubjectUsecase,
	Update: UpdateSubjectUsecase, Find: FindSubjectUsecase
}

const {
	GetByModule: GetCoursesByModule, Delete: DeleteCourse, Find: FindCourse,
	Add: AddCourse, GetFactory: GetCourseFactory, Update: UpdateCourse, GetRecent: GetRecentCourses
} = bottle.container.Usecases.Course as {
	GetByModule: GetCoursesByModuleUseCase, Delete: DeleteCourseUseCase,
	Find: FindCourseUsecase, Add: AddCourseUsecase, GetFactory: GetCourseFactoryUsecase,
	Update: UpdateCourseUsecase, GetRecent: GetRecentCoursesUsecase
}

const {
	Get: GetDiscussions, GetFactory: GetDiscussionFactory, Add: AddDiscussion, Listen: ListenToDiscussions
} = bottle.container.Usecases.Subject as {
	Get: GetDiscussionsUsecase, GetFactory: GetDiscussionFactoryUsecase, Add: AddDiscussionUsecase, Listen: ListenToDiscussionsUsecase
}

export {
	GetSubjects, DeleteSubject, GetSubjectFactory, AddSubject, UpdateSubject, FindSubject,
	GetCoursesByModule, DeleteCourse, FindCourse, AddCourse, GetCourseFactory, UpdateCourse, GetRecentCourses,
	GetDiscussions, ListenToDiscussions, AddDiscussion, GetDiscussionFactory
}
