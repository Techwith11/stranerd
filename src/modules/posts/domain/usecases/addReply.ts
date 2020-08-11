import IReplyRepository from '@root/modules/posts/domain/irepositories/ireply'
import ReplyFactory from '@root/modules/posts/domain/factories/reply'

export class AddReplyUseCase {
    private repository: IReplyRepository

    constructor(repository: IReplyRepository) {
        this.repository = repository
    }

    public async call (postId: string, factory: ReplyFactory) :Promise<string> {
        return await this.repository.add(postId, factory.toModel())
    }

}
