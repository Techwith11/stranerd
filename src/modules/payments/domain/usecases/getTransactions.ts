import { ITransactionRepository } from '../irepositories/itransaction'
import { GetClauses } from '@modules/core/data/datasources/base'

export class GetTransactionsUsecase {
	private readonly repository: ITransactionRepository

	constructor(repository: ITransactionRepository) {
		this.repository = repository
	}

	public async call(id: string){
		const conditions: GetClauses = {
			order: {
				field: 'dates.createdAt',
				desc: true
			}
		}
		return this.repository.get(id, conditions)
	}
}
