import { GetClauses } from '@modules/core/data/datasources/base'
import { ReplyToModel } from '@modules/posts/data/models/reply'
import { ReplyEntity } from '@modules/posts/domain/entities/reply'

export interface IReplyRepository {
    add: (postId: string, data: ReplyToModel) => Promise<string>,
    get: (postId:string, conditions?: GetClauses) => Promise<ReplyEntity[]>
    listen: (postId: string, callback: (entities: ReplyEntity[]) => void, conditions?: GetClauses) => Promise<() => void>
    upvote: (postId:string, reply: ReplyEntity ,id: string) => Promise<void>
    downvote: (postId:string, reply: ReplyEntity ,id: string) => Promise<void>
}
