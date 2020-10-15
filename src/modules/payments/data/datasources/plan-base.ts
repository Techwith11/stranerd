import { PlanFromModel } from '@modules/payments/data/models/plan'
import { GetClauses } from '@modules/core/data/datasources/base'

export abstract class PlanBaseDataSource {
	public abstract get: (conditions?: GetClauses) => Promise<PlanFromModel[]>
}
