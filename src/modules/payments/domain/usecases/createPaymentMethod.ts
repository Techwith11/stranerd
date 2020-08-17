import { IPaymentRepository } from '@root/modules/payments/domain/irepositories/ipayment'

export class CreatePaymentMethodUsecase {
	private readonly repository: IPaymentRepository

	constructor(repository: IPaymentRepository) {
		this.repository = repository
	}

	public async call(userId: string, nonce: string){
		return await this.repository.createMethod(userId, nonce)
	}
}
