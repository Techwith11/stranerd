import IReplyRepository from '@root/modules/posts/domain/irepositories/ireply'
import ReplyFactory from '@root/modules/posts/domain/factories/reply'

export default (repository: IReplyRepository) => {
    return async (factory: ReplyFactory) : Promise<string> => {
        return repository.add(factory.toModel())
    }
}
