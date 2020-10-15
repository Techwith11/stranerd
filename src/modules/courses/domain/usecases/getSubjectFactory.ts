import { SubjectFactory } from '../factories/subject'

export class GetSubjectFactoryUsecase {
	public call(): SubjectFactory {
		return new SubjectFactory()
	}
}
