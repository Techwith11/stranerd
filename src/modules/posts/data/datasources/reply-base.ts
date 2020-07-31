import { GetClauses } from '@root/modules/core/data/datasources/base'
import { ReplyFromModel, ReplyToModel } from '@root/modules/posts/data/models/reply'

export default abstract class ReplyBaseDataSource {
    public abstract create: (postId: string, data: ReplyToModel) => Promise<string>
    public abstract get: (postId: string, condition?: GetClauses) => Promise<ReplyFromModel[]>
}
