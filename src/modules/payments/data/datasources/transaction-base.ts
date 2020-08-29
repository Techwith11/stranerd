import { TransactionFromModel } from '@root/modules/payments/data/models/transaction'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export abstract class TransactionBaseDataSource {
	public abstract get: (id: string, conditions?: GetClauses) => Promise<TransactionFromModel[]>
}
