import { DiscussionFactory } from '@root/modules/courses/domain/factories/discussion'

export class GetDiscussionFactoryUsecase {
	public call() :DiscussionFactory {
		return new DiscussionFactory()
	}
}
