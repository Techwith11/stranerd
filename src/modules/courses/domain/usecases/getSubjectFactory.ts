import { SubjectFactory } from '@root/modules/courses/domain/factories/subject'

export class GetSubjectFactoryUsecase {
	public call(): SubjectFactory {
		return new SubjectFactory()
	}
}
