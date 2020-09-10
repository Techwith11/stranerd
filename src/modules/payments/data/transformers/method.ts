import { MethodFromModel } from '@root/modules/payments/data/models/method'
import { MethodEntity } from '@root/modules/payments/domain/entities/method'
import { timestampToDate } from '@root/modules/core/data/transformers/converters/getFirestoreDate'

export class MethodTransformer {
	public fromJSON(model: MethodFromModel){
		const { id, token, imageUrl, maskedNumber, expirationMonth, expirationYear, dates: { createdAt }} = model
		return new MethodEntity({
			id, token, maskedNumber, imageUrl,
			expirationDate: new Date(Number(expirationYear), Number(expirationMonth)),
			createdAt: timestampToDate(createdAt)!
		})
	}
}
