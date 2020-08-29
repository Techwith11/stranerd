import { ITransactionRepository } from '@root/modules/payments/domain/irepositories/itransaction'
import { TransactionBaseDataSource } from '@root/modules/payments/data/datasources/transaction-base'
import { TransactionTransformer } from '@root/modules/payments/data/transformers/transaction'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { TransactionEntity } from '@root/modules/payments/domain/entities/transaction'

export class TransactionRepository implements ITransactionRepository {
	private readonly dataSource: TransactionBaseDataSource
	private readonly transformer: TransactionTransformer

	constructor(dataSource: TransactionBaseDataSource, transformer: TransactionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	public async get(id: string, conditions?: GetClauses): Promise<TransactionEntity[]> {
		const models = await this.dataSource.get(id, conditions)
		return models.map((model) => this.transformer.fromJSON(model))
	}

}
