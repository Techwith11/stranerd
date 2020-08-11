import { UserEntity } from '@root/modules/users/domain/entities/user'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export interface IUserRepository {
	find: (id: string) => Promise<UserEntity | undefined>
	get: (conditions?: GetClauses) => Promise<UserEntity[]>
	listen: (callback: (entities: UserEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
}
