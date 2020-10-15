import { IPaymentRepository } from '../irepositories/ipayment'

export class GetClientTokenUsecase {
	private readonly repository: IPaymentRepository

	constructor(repository: IPaymentRepository) {
		this.repository = repository
	}

	public async call(){
		return await this.repository.getClientToken()
	}
}
