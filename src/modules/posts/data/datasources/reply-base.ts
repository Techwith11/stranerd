import { GetClauses } from '@root/modules/core/data/datasources/base'
import { ReplyFromModel, ReplyToModel } from '@root/modules/posts/data/models/reply'

export default abstract class ReplyBaseDataSource {
    public abstract create: (postId: string, data: ReplyToModel) => Promise<string>
    public abstract get: (postId: string, condition?: GetClauses) => Promise<ReplyFromModel[]>
    public abstract listen: (postId: string, callback: (documents: ReplyFromModel[]) => void, condition?: GetClauses) => Promise<() => void>
    public abstract upvote: (postId: string, replyId: string, userId: string, voterId: string) => Promise<void>
    public abstract downvote: (postId: string, replyId: string, userId: string, voterId: string) => Promise<void>
}
