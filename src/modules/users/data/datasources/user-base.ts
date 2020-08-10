import { UserFromModel } from '@root/modules/users/data/models/user'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export default abstract class UserBaseDataSource {
	public abstract get: (condition?: GetClauses) => Promise<UserFromModel[]>
	public abstract listen: (callback: (documents: UserFromModel[]) => void, condition?: GetClauses) => Promise<() => void>
	public abstract find: (id: string) => Promise<UserFromModel | undefined>
}
