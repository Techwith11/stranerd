import { TransactionFromModel } from '@modules/payments/data/models/transaction'
import { GetClauses } from '@modules/core/data/datasources/base'

export abstract class TransactionBaseDataSource {
	public abstract get: (id: string, conditions?: GetClauses) => Promise<TransactionFromModel[]>
}
