import { TransactionBaseDataSource } from '@root/modules/payments/data/datasources/transaction-base'
import { TransactionFromModel } from '@root/modules/payments/data/models/transaction'
import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class TransactionFirebaseDataSource implements TransactionBaseDataSource{
	public async get(id: string, conditions?: GetClauses): Promise<TransactionFromModel[]> {
		return await FirestoreService.get(`users/${id}/transactions`, conditions) as TransactionFromModel[]
	}
}
