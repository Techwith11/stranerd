import PostEntity from '@root/modules/posts/domain/entities/post'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import { PostToModel } from '@root/modules/posts/data/models/post'

export default interface IPostRepository {
    add: (data: PostToModel) => Promise<string>,
    find: (id: string) => Promise<PostEntity | undefined>
    get: (conditions?: GetClauses) => Promise<PostEntity[]>
    listen: (callback: (entities: PostEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
}
