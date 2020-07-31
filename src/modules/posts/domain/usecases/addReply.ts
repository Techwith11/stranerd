import IReplyRepository from '@root/modules/posts/domain/irepositories/ireply'
import ReplyFactory from '@root/modules/posts/domain/factories/reply'

export default (postId: string, repository: IReplyRepository) => {
    return async (factory: ReplyFactory) : Promise<string> => {
        return repository.add(postId, factory.toModel())
    }
}
