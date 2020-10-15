import { ITransactionRepository } from '@modules/payments/domain/irepositories/itransaction'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetTransactionsUsecase {
	private readonly repository: ITransactionRepository

	constructor(repository: ITransactionRepository) {
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
