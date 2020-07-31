import PostEntity from '@root/modules/posts/domain/entities/posts'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import IBaseRepository from '@root/modules/core/domains/irepositories/base'

export default interface IPostRepository extends IBaseRepository<PostEntity> {
    add: (data: PostEntity) => Promise<string>,
    find: (id: string) => Promise<PostEntity | undefined>
    get: (conditions?: GetClauses) => Promise<PostEntity[]>
}
