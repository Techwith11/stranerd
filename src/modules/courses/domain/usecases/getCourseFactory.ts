import { CourseFactory } from '../factories/course'

export class GetCourseFactoryUsecase {
	public call(): CourseFactory {
		return new CourseFactory()
	}
}
