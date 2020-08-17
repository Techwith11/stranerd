import { IMethodRepository } from '@root/modules/payments/domain/irepositories/imethod'

export class GetPaymentMethodsUsecase {
	private readonly repository: IMethodRepository

	constructor(repository: IMethodRepository) {
		this.repository = repository
	}

	public async call(id: string){
		const conditions = {
			order: {
				field: 'dates.createdAt',
				desc: true
			}
		}
		return this.repository.get(id, conditions)
	}
}
