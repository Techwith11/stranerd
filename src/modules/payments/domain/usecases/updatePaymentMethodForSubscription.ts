import { IPaymentRepository } from '../irepositories/ipayment'

export class UpdatePaymentMethodForSubscriptionUsecase {
	private readonly repository: IPaymentRepository

	constructor(repository: IPaymentRepository) {
		this.repository = repository
	}

	public async call(userId: string, token: string){
		return await this.repository.updateMethodForSubscription(userId, token)
	}
}
