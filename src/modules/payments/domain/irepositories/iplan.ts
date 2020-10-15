import { GetClauses } from '@modules/core/data/datasources/base'
import { PlanEntity } from '../entities/plan'

export abstract class IPlanRepository {
	public abstract get: (conditions?: GetClauses) => Promise<PlanEntity[]>
}
