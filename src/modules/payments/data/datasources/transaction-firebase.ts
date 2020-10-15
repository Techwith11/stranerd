import { TransactionBaseDataSource } from '../datasources/transaction-base'
import { TransactionFromModel } from '../models/transaction'
import { FirestoreService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'

export class TransactionFirebaseDataSource implements TransactionBaseDataSource{
	public async get(id: string, conditions?: GetClauses): Promise<TransactionFromModel[]> {
		return await FirestoreService.get(`users/${id}/transactions`, conditions) as TransactionFromModel[]
	}
}
