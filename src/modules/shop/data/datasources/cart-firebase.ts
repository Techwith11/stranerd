import { FirestoreService, FunctionsService } from '@modules/core/services/firebase'
import { CartBaseDataSource } from '../datasources/cart-base'
import { NoteToModel } from '../models/note'

export class CartFirebaseDataSource implements CartBaseDataSource{

	public async sendCartToEmail(data: { id: string; cart: NoteToModel[] }): Promise<void> {
		return await FunctionsService.call('sendEmailAfterPurchase', data)
	}

	public async buyMoreQuestions({ id, quantity } : { id: string; quantity: number }): Promise<void> {
		const data = { account: { questions: quantity } }
		await FirestoreService.update('users', id, data)
	}

}
