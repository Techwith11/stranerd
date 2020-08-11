import { PostFactory } from '@root/modules/posts/domain/factories/post'

export class GetPostFactoryUseCase {
    public call () :PostFactory {
        return new PostFactory()
    }

}
