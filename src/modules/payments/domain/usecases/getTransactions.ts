import { ITransactionRepository } from '@root/modules/payments/domain/irepositories/itransaction'

export class GetTransactionsUsecase {
	private readonly repository: ITransactionRepository

	constructor(repository: ITransactionRepository) {
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
