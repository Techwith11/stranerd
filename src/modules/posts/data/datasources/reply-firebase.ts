import { FirestoreService, FunctionsService } from '@root/modules/core/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'
import ReplyBaseDataSource from '@root/modules/posts/data/datasources/reply-base'
import { ReplyFromModel, ReplyToModel } from '@root/modules/posts/data/models/reply'

export default class ReplyFirebaseDataSource implements ReplyBaseDataSource{

    public async create(postId: string, data: ReplyToModel): Promise<string> {
        return (await FirestoreService.create(`posts/${postId}/replies`, data))
    }

    public async get(postId: string, conditions?: GetClauses): Promise<ReplyFromModel[]> {
        return await FirestoreService.get(`posts/${postId}/replies`,conditions) as ReplyFromModel[]
    }

    public async listen(postId: string, callback: (documents: ReplyFromModel[]) => void, conditions?: GetClauses): Promise<() => void> {
        return await FirestoreService.listen(callback, `posts/${postId}/replies`, conditions)
    }

    public async upvote(post: string, reply: string, user: string, voterId: string) {
        const dependencies = {
            post, id: voterId,
            user, reply
        }
        return await FunctionsService.call('upvoteReply', dependencies)
    }

    public async downvote(post: string, reply: string, user: string, voterId: string) {
        const dependencies = {
            post, id: voterId,
            user, reply
        }
        return await FunctionsService.call('downvoteReply', dependencies)
    }

}
