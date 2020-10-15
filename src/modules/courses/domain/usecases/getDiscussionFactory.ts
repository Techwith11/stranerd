import { DiscussionFactory } from '@modules/courses/domain/factories/discussion'

export class GetDiscussionFactoryUsecase {
	public call() :DiscussionFactory {
		return new DiscussionFactory()
	}
}
