import { NoteEntity } from '@root/modules/shop/domain/entities/note'

export interface ICartRepository {
	sendCartToEmail: (id: string, cart: NoteEntity[]) => Promise<void>
}
