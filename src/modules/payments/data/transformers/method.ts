import { MethodFromModel } from '@root/modules/payments/data/models/method'
import { MethodEntity } from '@root/modules/payments/domain/entities/method'

export class MethodTransformer {
	public fromJSON(model: MethodFromModel){
		const { id, cardType, token, maskedNumber, expirationMonth, expirationYear } = model
		return new MethodEntity({
			id, cardType, token, maskedNumber,
			expirationDate: new Date(Number(expirationYear), Number(expirationMonth))
		})
	}
}
