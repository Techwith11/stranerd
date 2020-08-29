import { GetClauses } from '@root/modules/core/data/datasources/base'
import { TransactionEntity } from '@root/modules/payments/domain/entities/transaction'

export abstract class ITransactionRepository {
	public abstract get: (id: string, conditions?: GetClauses) => Promise<TransactionEntity[]>
}
