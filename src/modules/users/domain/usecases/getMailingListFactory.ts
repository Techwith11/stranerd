import { SubscribeToMailingListFactory } from '../factories/subscribeToMailingList'

export class GetMailingListFactoryUsecase {
	public call () :SubscribeToMailingListFactory {
		return new SubscribeToMailingListFactory()
	}

}
