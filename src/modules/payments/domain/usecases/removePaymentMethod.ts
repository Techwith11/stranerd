import { IPaymentRepository } from '@modules/payments/domain/irepositories/ipayment'

export class RemovePaymentMethodUsecase {
	private readonly repository: IPaymentRepository

	constructor(repository: IPaymentRepository) {
		this.repository = repository
	}

	public async call(userId: string, methodId: string){
		return await this.repository.removeMethod(userId, methodId)
	}
}
