import { IReplyRepository } from '@modules/posts/domain/irepositories/ireply'
import { ReplyEntity } from '@modules/posts/domain/entities/reply'

export class ListenToRepliesUseCase {
    private repository: IReplyRepository

    constructor(repository: IReplyRepository) {
	    this.repository = repository
    }

    public async call (postId: string, callback: (entities: ReplyEntity[]) => void) :Promise<() => void > {
	    return await this.repository.listen(postId,callback)
    }

}
