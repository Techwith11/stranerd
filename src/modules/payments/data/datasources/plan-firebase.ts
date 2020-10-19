import { PlanBaseDataSource } from '../datasources/plan-base'
import { PlanFromModel } from '../models/plan'
import { DatabaseService } from '@modules/core/services/firebase'
import { GetClauses } from '@modules/core/data/datasources/base'

export class PlanFirebaseDataSource implements PlanBaseDataSource{
	public async get(conditions?: GetClauses): Promise<PlanFromModel[]> {
		const docs = await DatabaseService.get('subscriptions', conditions) as { [key: string]: PlanFromModel } ?? {}
		return Object.entries(docs ?? {}).map((e) => ({ ...e[1], id: e[0] }))
	}
}
