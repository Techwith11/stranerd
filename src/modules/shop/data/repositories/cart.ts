import { ICartRepository } from '../../domain/irepositories/icart'
import { CartBaseDataSource } from '../datasources/cart-base'
import { NoteTransformer } from '../transformers/note'
import { NoteEntity } from '../../domain/entities/note'

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

	public async buyMoreQuestions(id: string, quantity: number): Promise<void> {
		return await this.dataSource.buyMoreQuestions({ id, quantity })
	}

}
