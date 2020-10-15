import { MethodBaseDataSource } from '@modules/payments/data/datasources/method-base'
import { MethodFromModel } from '@modules/payments/data/models/method'
import { FirestoreService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'

export class MethodFirebaseDataSource implements MethodBaseDataSource{
	public async get(id: string, conditions?: GetClauses): Promise<MethodFromModel[]> {
		return await FirestoreService.get(`users/${id}/paymentMethods`, conditions) as MethodFromModel[]
	}
}
