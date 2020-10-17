import { UserFromModel } from '../models/user'
import { GetClauses } from '@modules/core/data/datasources/base'

export abstract class UserBaseDataSource {
	public abstract get: (condition?: GetClauses) => Promise<UserFromModel[]>
	public abstract listen: (callback: (documents: UserFromModel[]) => void, condition?: GetClauses) => Promise<() => void>
	public abstract find: (id: string) => Promise<UserFromModel | undefined>
}
