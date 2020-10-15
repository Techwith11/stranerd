import { SubjectFirebaseDataSource } from './data/datasources/subject-firebase'
import { SubjectTransformer } from './data/transformers/subject'
import { SubjectRepository } from './data/repositories/subject'
import { GetSubjectsUseCase } from './domain/usecases/getSubjects'
import { DeleteSubjectUseCase } from './domain/usecases/deleteSubject'
import { GetSubjectFactoryUsecase } from './domain/usecases/getSubjectFactory'
import { AddSubjectUsecase } from './domain/usecases/addSubject'
import { UpdateSubjectUsecase } from './domain/usecases/updateSubject'
import { FindSubjectUsecase } from './domain/usecases/findSubject'
import { CourseFirebaseDataSource } from './data/datasources/course-firebase'
import { CourseTransformer } from './data/transformers/course'
import { CourseRepository } from './data/repositories/course'
import { GetCoursesByModuleUseCase } from './domain/usecases/getCoursesByModule'
import { DeleteCourseUseCase } from './domain/usecases/deleteCourse'
import { FindCourseUsecase } from './domain/usecases/findCourse'
import { AddCourseUsecase } from './domain/usecases/addCourse'
import { GetCourseFactoryUsecase } from './domain/usecases/getCourseFactory'
import { UpdateCourseUsecase } from './domain/usecases/updateCourse'
import { GetRecentCoursesUsecase } from './domain/usecases/getRecentCourses'
import { DiscussionFirebaseDataSource } from './data/datasources/discussion-firebase'
import { DiscussionTransformer } from './data/transformers/discussion'
import { DiscussionRepository } from './data/repositories/discussion'
import { GetDiscussionFactoryUsecase } from './domain/usecases/getDiscussionFactory'
import { AddDiscussionUsecase } from './domain/usecases/addDiscussion'
import { ListenToDiscussionsUsecase } from './domain/usecases/listenToDiscussions'

const subjectDataSource = new SubjectFirebaseDataSource()
const courseDataSource = new CourseFirebaseDataSource()
const discussionDataSource = new DiscussionFirebaseDataSource()

const subjectTransformer = new SubjectTransformer()
const courseTransformer = new CourseTransformer()
const discussionTransformer = new DiscussionTransformer()

const subjectRepository = new SubjectRepository(subjectDataSource, subjectTransformer)
const courseRepository = new CourseRepository(courseDataSource, courseTransformer)
const discussionRepository = new DiscussionRepository(discussionDataSource, discussionTransformer)

export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const AddSubject = new AddSubjectUsecase(subjectRepository)
export const UpdateSubject = new UpdateSubjectUsecase(subjectRepository)
export const FindSubject = new FindSubjectUsecase(subjectRepository)
export const GetSubjectFactory = new GetSubjectFactoryUsecase()

export const GetCoursesByModule = new GetCoursesByModuleUseCase(courseRepository)
export const DeleteCourse = new DeleteCourseUseCase(courseRepository)
export const FindCourse = new FindCourseUsecase(courseRepository)
export const AddCourse = new AddCourseUsecase(courseRepository)
export const UpdateCourse = new UpdateCourseUsecase(courseRepository)
export const GetRecentCourses = new GetRecentCoursesUsecase(courseRepository)
export const GetCourseFactory = new GetCourseFactoryUsecase()

export const AddDiscussion = new AddDiscussionUsecase(discussionRepository)
export const ListenToDiscussions = new ListenToDiscussionsUsecase(discussionRepository)
export const GetDiscussionFactory = new GetDiscussionFactoryUsecase()

