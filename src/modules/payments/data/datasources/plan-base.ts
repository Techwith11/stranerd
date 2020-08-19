import { PlanFromModel } from '@root/modules/payments/data/models/plan'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export abstract class PlanBaseDataSource {
	public abstract get: (conditions?: GetClauses) => Promise<PlanFromModel[]>
}
