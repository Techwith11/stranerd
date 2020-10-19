import { MethodBaseDataSource } from '../datasources/method-base'
import { MethodFromModel } from '../models/method'
import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'

export class MethodFirebaseDataSource implements MethodBaseDataSource{
	public async get(id: string, conditions?: GetClauses): Promise<MethodFromModel[]> {
		const docs = await DatabaseService.get(`users/${id}/paymentMethods`, conditions) as { [key: string]: MethodFromModel } ?? {}
		return Object.entries(docs ?? {}).map((e) => ({ ...e[1], id: e[0] }))
	}
}
