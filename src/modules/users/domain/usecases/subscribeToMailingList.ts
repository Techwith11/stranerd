import { IRoleRepository } from '@modules/users/domain/irepositories/irole'
import { SubscribeToMailingListFactory } from '@modules/users/domain/factories/subscribeToMailingList'

export class SubscribeToMailingListUsecase {
	private repository: IRoleRepository

	constructor(repository: IRoleRepository) {
		this.repository = repository
	}

	public async call (factory: SubscribeToMailingListFactory) :Promise<void> {
		return await this.repository.subscribeToMailingList(await factory.toModel())
	}

}
