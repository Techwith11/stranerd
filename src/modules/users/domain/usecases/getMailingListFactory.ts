import { SubscribeToMailingListFactory } from '@root/modules/users/domain/factories/subscribeToMailingList'

export class GetMailingListFactoryUsecase {
	public call () :SubscribeToMailingListFactory {
		return new SubscribeToMailingListFactory()
	}

}
