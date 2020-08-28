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

export const GetDiscussions = new GetDiscussionsUsecase(discussionRepository)
export const AddDiscussion = new AddDiscussionUsecase(discussionRepository)
export const ListenToDiscussions = new ListenToDiscussionsUsecase(discussionRepository)
export const GetDiscussionFactory = new GetDiscussionFactoryUsecase()

