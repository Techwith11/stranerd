import { GetClauses } from '@root/modules/core/data/datasources/base'
import { MethodEntity } from '@root/modules/payments/domain/entities/method'

export abstract class IMethodRepository {
	public abstract get: (id: string, conditions?: GetClauses) => Promise<MethodEntity[]>
}
