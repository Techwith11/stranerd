import { IRoleRepository } from '../irepositories/irole'
import { SubscribeToMailingListFactory } from '../factories/subscribeToMailingList'

export class SubscribeToMailingListUsecase {
	private repository: IRoleRepository

	constructor(repository: IRoleRepository) {
		this.repository = repository
	}

	public async call (factory: SubscribeToMailingListFactory) :Promise<void> {
		return await this.repository.subscribeToMailingList(await factory.toModel())
	}

}
