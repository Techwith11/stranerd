import { TransactionFromModel } from '@root/modules/payments/data/models/transaction'
import { TransactionEntity } from '@root/modules/payments/domain/entities/transaction'
import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

export class TransactionTransformer {
	public fromJSON(model: TransactionFromModel){
		const { id, status, amount, creditCard, type, dates: { createdAt } } = model
		return new TransactionEntity({
			id, status, type, creditCard, amount: Number(amount),
			createdAt: timestampToDate(createdAt)!
		})
	}
}
