import { ITransactionRepository } from '../../domain/irepositories/itransaction'
import { TransactionBaseDataSource } from '../datasources/transaction-base'
import { TransactionTransformer } from '../transformers/transaction'
import { GetClauses } from '@modules/core/data/datasources/base'
import { TransactionEntity } from '../../domain/entities/transaction'

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
