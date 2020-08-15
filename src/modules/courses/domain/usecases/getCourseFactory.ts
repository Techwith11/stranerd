import { CourseFactory } from '@root/modules/courses/domain/factories/course'

export class GetCourseFactoryUsecase {
	public call(): CourseFactory {
		return new CourseFactory()
	}
}
