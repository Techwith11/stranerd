import { GetClauses } from '@root/modules/core/data/datasources/base'
import { ReplyToModel } from '@root/modules/posts/data/models/reply'
import ReplyEntity from '@root/modules/posts/domain/entities/replles'

export default interface IReplyRepository {
    add: (postId: string, data: ReplyToModel) => Promise<string>,
    get: (postId:string, conditions?: GetClauses) => Promise<ReplyEntity[]>
    listen: (postId: string, callback: (entities: ReplyEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
}
