import { SubjectFactory } from '@modules/courses/domain/factories/subject'

export class GetSubjectFactoryUsecase {
	public call(): SubjectFactory {
		return new SubjectFactory()
	}
}
