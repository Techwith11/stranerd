import { DiscussionFactory } from '../factories/discussion'

export class GetDiscussionFactoryUsecase {
	public call() :DiscussionFactory {
		return new DiscussionFactory()
	}
}
