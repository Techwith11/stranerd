import { MethodFromModel } from '../models/method'
import { GetClauses } from '@modules/core/data/datasources/base'

export abstract class MethodBaseDataSource {
	public abstract get: (id: string, conditions?: GetClauses) => Promise<MethodFromModel[]>
}
