import { GetClauses } from '@modules/core/data/datasources/base'
import { TransactionEntity } from '@modules/payments/domain/entities/transaction'

export abstract class ITransactionRepository {
	public abstract get: (id: string, conditions?: GetClauses) => Promise<TransactionEntity[]>
}
