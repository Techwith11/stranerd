import { GetClauses } from '@root/modules/core/data/datasources/base'
import { PlanEntity } from '@root/modules/payments/domain/entities/plan'

export abstract class IPlanRepository {
	public abstract get: (conditions?: GetClauses) => Promise<PlanEntity[]>
}
