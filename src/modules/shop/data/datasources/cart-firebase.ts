import { FunctionsService } from '@root/modules/core/services/firebase'
import { CartBaseDataSource } from '@root/modules/shop/data/datasources/cart-base'
import { NoteToModel } from '@root/modules/shop/data/models/note'

export class CartFirebaseDataSource implements CartBaseDataSource{

	public async sendCartToEmail(data: { id: string; cart: NoteToModel[] }): Promise<void> {
		return await FunctionsService.call('sendEmailAfterPurchase', data)
	}

}
