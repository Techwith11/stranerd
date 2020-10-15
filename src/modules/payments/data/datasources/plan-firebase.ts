import { PlanBaseDataSource } from '@modules/payments/data/datasources/plan-base'
import { PlanFromModel } from '@modules/payments/data/models/plan'
import { FirestoreService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'

export class PlanFirebaseDataSource implements PlanBaseDataSource{
	public async get(conditions?: GetClauses): Promise<PlanFromModel[]> {
		return await FirestoreService.get('subscriptions', conditions) as PlanFromModel[]
	}
}
