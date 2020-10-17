import { IPaymentRepository } from '../irepositories/ipayment'

export class MakePaymentUsecase {
	private readonly repository: IPaymentRepository

	constructor(repository: IPaymentRepository) {
		this.repository = repository
	}

	public async call(userId: string, amount: number, token: string){
		return await this.repository.makePayment(userId, amount, token)
	}
}
