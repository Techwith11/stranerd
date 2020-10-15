import { GetClauses } from '@modules/core/data/datasources/base'
import { MethodEntity } from '@modules/payments/domain/entities/method'

export abstract class IMethodRepository {
	public abstract get: (id: string, conditions?: GetClauses) => Promise<MethodEntity[]>
}
