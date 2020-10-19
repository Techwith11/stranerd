import { IMethodRepository } from '../irepositories/imethod'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetPaymentMethodsUsecase {
	private readonly repository: IMethodRepository

	constructor(repository: IMethodRepository) {
		this.repository = repository
	}

	public async call(id: string){
		const conditions: GetClauses = {
			order: {
				field: 'dates/createdAt',
				desc: true
			}
		}
		return this.repository.get(id, conditions)
	}
}
