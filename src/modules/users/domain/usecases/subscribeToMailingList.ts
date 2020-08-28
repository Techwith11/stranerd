import { IRoleRepository } from '@root/modules/users/domain/irepositories/irole'
import { SubscribeToMailingListFactory } from '@root/modules/users/domain/factories/subscribeToMailingList'

export class SubscribeToMailingListUsecase {
	private repository: IRoleRepository

	constructor(repository: IRoleRepository) {
		this.repository = repository
	}

	public async call (factory: SubscribeToMailingListFactory) :Promise<void> {
		return await this.repository.subscribeToMailingList(await factory.toModel())
	}

}
