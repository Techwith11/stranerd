import { MethodFromModel } from '@root/modules/payments/data/models/method'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export abstract class MethodBaseDataSource {
	public abstract get: (id: string, conditions?: GetClauses) => Promise<MethodFromModel[]>
}
