import { IPaymentRepository } from '../irepositories/ipayment'

export class SubscribeToPlanUsecase {
	private readonly repository: IPaymentRepository

	constructor(repository: IPaymentRepository) {
		this.repository = repository
	}

	public async call(userId: string, planId: string, token: string){
		return await this.repository.subscribeToPlan(userId, planId, token)
	}
}
