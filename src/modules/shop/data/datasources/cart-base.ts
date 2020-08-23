import { NoteToModel } from '@root/modules/shop/data/models/note'

export abstract class CartBaseDataSource {
	public abstract sendCartToEmail: (data: { id: string, cart: NoteToModel[] }) => Promise<void>
	public abstract buyMoreQuestions: (data: { id: string, quantity: number }) => Promise<void>
}
