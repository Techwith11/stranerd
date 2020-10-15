import { PostEntity } from '@modules/posts/domain/entities/post'
import { GetClauses } from '@modules/core/data/datasources/base'
import { PostToModel } from '@modules/posts/data/models/post'

export interface IPostRepository {
    add: (data: PostToModel) => Promise<string>,
    find: (id: string) => Promise<PostEntity | undefined>
    get: (conditions?: GetClauses) => Promise<PostEntity[]>
    listen: (callback: (entities: PostEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
}
