import { ICartRepository } from '@root/modules/shop/domain/irepositories/icart'
import { CartBaseDataSource } from '@root/modules/shop/data/datasources/cart-base'
import { NoteTransformer } from '@root/modules/shop/data/transformers/note'
import { NoteEntity } from '@root/modules/shop/domain/entities/note'

export class CartRepository implements ICartRepository{
	private dataSource: CartBaseDataSource
	private transformer: NoteTransformer

	constructor(dataSource: CartBaseDataSource, transformer: NoteTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async sendCartToEmail(id: string, cart: NoteEntity[]): Promise<void> {
		return await this.dataSource.sendCartToEmail({ id, cart: cart.map(this.transformer.toJSON) })
	}

}
