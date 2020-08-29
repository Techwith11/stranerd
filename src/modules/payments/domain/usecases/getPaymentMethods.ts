import { IMethodRepository } from '@root/modules/payments/domain/irepositories/imethod'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class GetPaymentMethodsUsecase {
	private readonly repository: IMethodRepository

	constructor(repository: IMethodRepository) {
		this.repository = repository
	}

	public async call(id: string, date?: Date){
		const conditions: GetClauses = {
			order: {
				field: 'dates.createdAt',
				desc: true
			}
		}
		if(date) {
			conditions.where = [
				{ field: 'dates.createdAt', condition: '>', value: date }
			]
		}
		return this.repository.get(id, conditions)
	}
}
