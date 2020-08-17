import { MethodBaseDataSource } from '@root/modules/payments/data/datasources/method-base'
import { MethodFromModel } from '@root/modules/payments/data/models/method'
import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class MethodFirebaseDataSource implements MethodBaseDataSource{
	public async get(id: string, conditions?: GetClauses): Promise<MethodFromModel[]> {
		return await FirestoreService.get(`users/${id}/paymentMethods`, conditions) as MethodFromModel[]
	}
}
