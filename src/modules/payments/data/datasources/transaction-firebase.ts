import { TransactionBaseDataSource } from '../datasources/transaction-base'
import { TransactionFromModel } from '../models/transaction'
import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'

export class TransactionFirebaseDataSource implements TransactionBaseDataSource{
	public async get(id: string, conditions?: GetClauses): Promise<TransactionFromModel[]> {
		const docs = await DatabaseService.get(`users/${id}/transactions`, conditions) as { [key: string]: TransactionFromModel } ?? {}
		return Object.entries(docs ?? {}).map((e) => ({ ...e[1], id: e[0] }))
	}
}
