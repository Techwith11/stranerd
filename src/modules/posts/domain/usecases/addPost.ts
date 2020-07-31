import IPostRepository from '@root/modules/posts/domain/irepositories/ipost'
import PostEntity from '@root/modules/posts/domain/entities/posts'
import PostFactory from '@root/modules/posts/domain/factories/post'

export default (repository: IPostRepository) => {
    return async (factory: PostFactory) : Promise<string> => {
        return repository.add(factory.toModel())
    }
}
