import { GetClauses } from '@modules/core/data/datasources/base'
import { ReplyFromModel, ReplyToModel } from '../models/reply'

export abstract class ReplyBaseDataSource {
    public abstract create: (postId: string, data: ReplyToModel) => Promise<string>
    public abstract get: (postId: string, condition?: GetClauses) => Promise<ReplyFromModel[]>
    public abstract listen: (postId: string, callback: (documents: ReplyFromModel[]) => void, condition?: GetClauses) => Promise<() => void>
    public abstract like: (postId: string, replyId: string, userId: string) => Promise<void>
    public abstract dislike: (postId: string, replyId: string, userId: string) => Promise<void>
}
