import IPostRepository from '@root/modules/posts/domain/irepositories/ipost'
import PostEntity from '@root/modules/posts/domain/entities/posts'

export default (repository: IPostRepository) => {
    return async (id: string) : Promise<PostEntity | undefined> => {
        return repository.find(id)
    }
}
