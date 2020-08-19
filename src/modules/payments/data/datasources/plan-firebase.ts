import { PlanBaseDataSource } from '@root/modules/payments/data/datasources/plan-base'
import { PlanFromModel } from '@root/modules/payments/data/models/plan'
import { FirestoreService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export class PlanFirebaseDataSource implements PlanBaseDataSource{
	public async get(conditions?: GetClauses): Promise<PlanFromModel[]> {
		return await FirestoreService.get('subscriptions', conditions) as PlanFromModel[]
	}
}
