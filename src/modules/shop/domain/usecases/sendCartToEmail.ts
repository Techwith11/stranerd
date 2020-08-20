import { NoteEntity } from '@root/modules/shop/domain/entities/note'
import { ICartRepository } from '@root/modules/shop/domain/irepositories/icart'

export class SendCartToEmailUseCase {
	private repository: ICartRepository

	constructor(repository: ICartRepository) {
		this.repository = repository
	}

	public async call (id: string, cart: NoteEntity[]) : Promise<void> {
		return await this.repository.sendCartToEmail(id, cart)
	}

}
