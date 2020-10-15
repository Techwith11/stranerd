import { IPaymentRepository } from '@modules/payments/domain/irepositories/ipayment'

export class CancelSubscriptionUsecase {
	private readonly repository: IPaymentRepository

	constructor(repository: IPaymentRepository) {
		this.repository = repository
	}

	public async call(userId: string){
		return await this.repository.cancelSubscription(userId)
	}
}
