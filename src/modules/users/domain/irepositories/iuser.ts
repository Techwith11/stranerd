import UserEntity from '@root/modules/posts/domain/entities/posts'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export default interface IUserRepository {
	find: (id: string) => Promise<UserEntity | undefined>
	get: (conditions?: GetClauses) => Promise<UserEntity[]>
	listen: (callback: (entities: UserEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
}
