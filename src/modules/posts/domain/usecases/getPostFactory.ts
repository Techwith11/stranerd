import PostFactory from '@root/modules/posts/domain/factories/post'

export class GetPostFactoryUseCase {
    public call (factory: PostFactory) :PostFactory {
        return new PostFactory()
    }

}
